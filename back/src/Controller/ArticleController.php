<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/article")
 */
class ArticleController extends AbstractController
{

    /**
     * @Route("/all", name="article_all", methods={"GET"})
     */
    public function readAll(): Response
    {
        $articles =  $this->getDoctrine()->getRepository(Article::class)->findAll();
        $data = [];
        foreach ($articles as $article) {
            array_push($data, $this->getArticleData($article));
        }
        return $this->json($data);
    }


    /**
     * @Route("/new", name="article_new", methods={"POST"})
     */
    public function addArticle(Request $request, EntityManagerInterface $entityManager): Response
    {
        $article = new Article();
        $article->setName($request->request->get("name"));
        $article->setDescription($request->request->get("description"));
        $article->setWeight($request->request->get("weight"));
        $article->setColor($request->request->get("color"));
        $article->setQuantity($request->request->get("quantity"));
        $article->setPrice($request->request->get("price"));
        $article->setPromo($request->request->get("promo"));
        $article->setCreationDate(new \Datetime());
        $article->setUpdatedDate(new \Datetime());
        $article->setNew(true);
        $cat_arr = explode(",", $request->request->get("categories"));

        foreach ($cat_arr as $value) {
            $value = trim(strtolower($value));
            $existing_cat = $this->getDoctrine()->getRepository(Category::class)->findBy([
                "name" => $value
            ]);
            if ($existing_cat) {
                $article->addCategory($existing_cat[0]);
            } else {
                $category = new Category();
                $category->setName($value);
                $entityManager->persist($category);
                $article->addCategory($category);
            }
        }


        $entityManager->persist($article);
        $entityManager->flush();
        // foreach ($article->getCategories() as $value) {
        //     dump($value->getName());
        // }

        $articles =  $this->getDoctrine()->getRepository(Article::class)->findAll();
        $data = [];
        foreach ($articles as $article) {
            array_push($data, $this->getArticleData($article));
        }

        return $this->json($data);
    }

    /**
     * @Route("/{id}", name="article", methods={"GET"})
     */
    public function show(Article $article): Response
    {
        return $this->json($this->getArticleData($article));
    }


    /**
     * @Route("/{id}/edit", name="article_edit", methods={"GET", "POST"})
     */
    public function edit(Request $request, Article $article, EntityManagerInterface $entityManager): Response
    {

        $name = $request->request->get("name");
        $description = $request->request->get("description");
        $weight = $request->request->get("weight");
        $color = $request->request->get("color");
        $quantity = $request->request->get("quantity");
        $price = $request->request->get("price");
        $promo = $request->request->get("promo");
        $cat = $request->request->get("categories");
        $article->setUpdatedDate(new \Datetime());
        $article->setNew(true);
        if ($name !== "")
            $article->setName($name);
        if ($description !== "")
            $article->setDescription($description);
        if ($weight !== "")
            $article->setWeight($weight);
        if ($color !== "")
            $article->setColor($color);
        if ($quantity !== "")
            $article->setQuantity($quantity);
        if ($price !== "")
            $article->setPrice($price);
        if ($promo !== "")
            $article->setPromo($promo);
        if ($cat !== "") {
            $cat_arr = explode(",", $cat);
            foreach ($article->getCategories() as $existing_cat) {
                $article->removeCategory($existing_cat);
            }
            foreach ($cat_arr as $value) {
                $value = trim(strtolower($value));
                $category = new Category();
                $category->setName($value);
                $article->addCategory($category);
                $entityManager->persist($category);
            }
        }
        $entityManager->persist($article);
        $entityManager->flush();
        $data = $this->getArticleData($article);
        $data["status"] = "ok";
        return $this->json($data);
    }



    /**
     * @Route("/delete/{id}", name="delete", methods={"GET"})
     */
    public function deleteArticle(Article $article,  EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($article);
        $entityManager->flush();
        return $this->json(["status" => "ok"]);
    }



    public function getArticleData(Article $article)
    {
        $categories = [];
        $photos = [];

        foreach ($article->getPhotos() as $photo) {
            array_push($photos, [
                "img_link" => $photo->getImgLink(),
            ]);
        }
        foreach ($article->getCategories() as $cat) {
            // dump($cat);
            array_push($categories, [
                "name" => $cat->getName(),
                "id" => $cat->getId(),
            ]);
        }

        return [
            "data" => [
                "categories" => $categories,
                "photos" => $photos,
                "id" => $article->getId(),
                "name" => $article->getName(),
                "description" => $article->getDescription(),
                "quantity" => $article->getQuantity(),
                "price" => $article->getPrice(),
                "new" => $article->getNew(),
                "promo" => $article->getPromo(),
                "weight" => $article->getWeight(),
                "color" => $article->getColor(),
                "creation_date" => $article->getCreationDate(),
                "updated_date" => $article->getUpdatedDate(),
            ]
        ];
    }
}
