<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use COM;
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
     * @Route("/new", name="category_new", methods={"POST"})
     */
    public function addCategory(Request $request, EntityManagerInterface $entityManager): Response
    {
        $category = new Category();
        $category->setName($request->request->get('name'));
        $entityManager->persist($category);
        $entityManager->flush();
    }

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
     * @Route("/{id}", name="category", methods={"GET"})
     */
    public function show(Category $category): Response
    {
        return $this->json($this->getName($category));
    }

    public function getCategoryData(Category $category)
    {
    }
}
