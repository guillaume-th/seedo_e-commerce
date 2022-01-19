<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\ShippingFees;

    /**
     * @Route("/shipping")
     */
class ShippingFeesController extends AbstractController
{
    /**
     * @Route("/edit/kg", name="admin_edit_price_kg")
     */
    public function panel(EntityManagerInterface $entityManager,Request $requests,ShippingFees $ShippingFees): Response
    {
        $kg=$requests->request->get("kg");
        $ShippingFees->setPriceByKg($kg);
        return $this->json(['result' => "ok"]);
    }
}
