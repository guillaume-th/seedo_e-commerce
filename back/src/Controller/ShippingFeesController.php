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
    public function Shippingkg(EntityManagerInterface $entityManager,Request $requests): Response
    {
        $ShippingFees = $this->getDoctrine()->getRepository(ShippingFees::class)->find(1);
        if(!$ShippingFees){
            $ShippingFees = new ShippingFees;
        }
        $kg=$requests->request->get("kg");
        $ShippingFees->setPriceByKg($kg);
        $entityManager->persist($ShippingFees);
        $entityManager->flush();
        return $this->json(['result' => "ok"]);
    }
    /**
     * @Route("/edit/distance", name="admin_edit_price_km")
     */
    public function Shipping100km(EntityManagerInterface $entityManager,Request $requests): Response
    {
        $ShippingFees = $this->getDoctrine()->getRepository(ShippingFees::class)->find(1);
        if(!$ShippingFees){
            $ShippingFees = new ShippingFees;
        }
        $km=$requests->request->get("km");
        $ShippingFees->setPriceBy100Km($km);
        $entityManager->persist($ShippingFees);
        $entityManager->flush();
        return $this->json(['result' => "ok"]);
    }
    /**
     * @Route("/all", name="admin_read_shipping_price")
     */
    public function read_shipping_price(): Response
    {
        $ShippingFees = $this->getDoctrine()->getRepository(ShippingFees::class)->find(1);
        if(!$ShippingFees){
            $PriceBy100Km='unset';
            $PriceByKg='unset';
        }else{
       $PriceBy100Km=$ShippingFees->getPriceBy100Km();
       $PriceByKg=$ShippingFees->getPriceByKg();
        }
        return $this->json(['PriceBy100Km' => $PriceBy100Km,'PriceByKg' => $$PriceByKg]);
    }
}
