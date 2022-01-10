<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Order;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;


/**
 * @Route("/order")
 */
class OrderController extends AbstractController
{
    /**
     * @Route("/all", name="order" methods={"GET"})
     */
    public function index(): Response
    {
        $orders =  $this->getDoctrine()->getRepository(Order::class)->findAll();
        $data = [];
        foreach ($orders as $order) {
            array_push($data, $this->$order);
        }

        return $this->json([
            'status' => $data,
        ]);
    }
    /**
     * @Route("/new", name="order_new", methods={"POST"})
     */
    public function addorder(Request $request, Article $Article,  EntityManagerInterface $entityManager): Response
    {
        $Order = new Order();
        $Order->setCreationDate(new \DateTime());
        $user = $this->getDoctrine()->getRepository(User::class)->find($request->request->get("user_id"));
        $Order->setUser($user);
        $Order->setStatus('en Cours');
        dd($request->request->get("articles_id"));
        foreach ($request->request->get("articles_id") as $value) {
        $quantity = $this->getDoctrine()->getRepository(Article::class)->find($value->get('quantity'));
            if($quantity>$value->get('quantity')){
                $data["status"] = "out of stock";
                return $this->json($data);
            }
            for ($i=0; $i < $value->get('quantity') ; $i++) { 
                $article = $this->getDoctrine()->getRepository(Article::class)->find($value->get('id'));
            $Order->addArticle($article);
            }
        }
        $entityManager->persist($Order);
        $entityManager->flush();
        $data["status"] = "ok";
        return $this->json($data);
    }
     /**
     * @Route("/{id}", name="order_selected")
     */
    public function SelectedOrder(Request $request, Order $order,  EntityManagerInterface $entityManager): Response
    {

        dd($order);

        return $this->json([
            'status' => $order,
        ]);
    }

}
