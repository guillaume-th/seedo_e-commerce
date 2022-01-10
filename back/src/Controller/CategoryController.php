<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
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
}
