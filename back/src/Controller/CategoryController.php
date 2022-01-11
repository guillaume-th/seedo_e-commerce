<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use COM;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/category")
 */
class CategoryController extends AbstractController
{
    /**
     * @Route("/all", name="category_index", methods={"GET"})
     */
    public function getAll(CategoryRepository $categoryRepository): Response
    {
        $request = $categoryRepository->findAll();
        $result = [];
        for ($i = 0; $i < count($request); $i++) {
            array_push($result, ['id' => $request[$i]->getId(), 'name' => $request[$i]->getName()]);
        }
        return $this->json($result);
    }

    /**
     * @Route("/{id}", name="category_by_id", methods={"GET"})
     */
    public function getCategoryById($id): Response
    {
        $request = $this->getDoctrine()->getRepository(Category::class)
            ->findBy([
                'id' => $id,
            ]);;
        return $this->json(["id" => $request[0]->getId(), "name" => $request[0]->getName()]);
    }
    /**
     * @Route("/delete/{id}", name="category_delete", methods={"POST"})
     */
    public function DeleteCategoryById($id, EntityManagerInterface $entityManager): Response
    {
        $category = $this->getDoctrine()->getRepository(Category::class)
            ->findBy([
                'id' => $id,
            ]);;
        $entityManager->remove($category[0]);
        $entityManager->flush();
        return $this->json(["status" => "ok"]);
    }
}
