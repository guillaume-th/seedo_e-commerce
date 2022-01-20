<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Color;
use Doctrine\ORM\EntityManagerInterface;

class ColorController extends AbstractController
{
    /**
     * @Route("/colors/all", name="color")
     */
    public function index(EntityManagerInterface $em): Response
    {
        $defaultValues = [
            ["name" => "blue", "price" => 5],
            ["name" => "green", "price" => 15],
            ["name" => "red", "price" => 10],
            ["name" => "black", "price" => 15],
            ["name" => "white", "price" => 20],
            ["name" => "brown", "price" => 25],
        ];
        $colors = $this->getDoctrine()->getRepository(Color::class)->findAll();
        if (count($colors) > 0) {
            foreach ($colors as $key => $color) {
                foreach ($defaultValues as $value) {
                    if ($value["name"] === $color->getName()) {
                        $value["name"] = $color->getPriceModification();
                    }
                }
            }
        } else {
            foreach ($defaultValues as $color) {
                $colorEn = new Color();
                $colorEn->setName($color["name"]);
                $colorEn->setPriceModification($color["price"]);
                $em->persist($colorEn);
            }
            $em->flush();
        }
        return $this->json($defaultValues);
    }
}
