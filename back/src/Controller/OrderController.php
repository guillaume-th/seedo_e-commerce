<?php

namespace App\Controller;

use App\Entity\Adress;
use App\Entity\Article;
use App\Entity\Order;
use App\Entity\Count;
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
     * @Route("/all", name="order_all", methods={"GET"})
     */
    public function index_order(EntityManagerInterface $entityManager): Response
    {
        $orders =  $this->getDoctrine()->getRepository(Order::class)->findAll();
        $data = [];
        foreach ($orders as $order) {
            $orderarticle = [];
            foreach ($order->getArticles() as $value) {
                $count =  $this->getDoctrine()->getRepository(Count::class)->findBy(
                    [
                        "article_id" => $value->getId(),
                        "order_id" => $order->getId(),
                    ]
                )[0]->getQuantity();

                array_push($orderarticle, [
                    'id' => $value->getId(),
                    'name' => $value->getName(),
                    'price' => $value->getPrice(),
                    'quantity' => $count,
                ]);
            }
            array_push($data, [
                "id" => $order->getId(),
                "status" => $order->getStatus(),
                "creation_date" => $order->getCreationDate(),
                "user" => [
                    "id_user" => $order->getUser()->getId(),
                    "email_user" => $order->getUser()->getEmail(),
                    "firstname_user" => $order->getUser()->getFirstname(),
                    "lastname_user" => $order->getUser()->getLastname(),
                ],
                "article" => $orderarticle,
                "OrderPrice" => $order->getOrderPrice()
            ]);
        }
        return $this->json(['result' => $data]);
    }

    /**
     * @Route("/new", name="order_new", methods={"POST"})
     */
    public function addorder(Request $requests, EntityManagerInterface $entityManager): Response
    {
        $count = 0;
        $request = json_decode($requests->getContent(), true);
        $Order = new Order();
        $Order->setCreationDate(new \DateTime());
        $user = $this->getDoctrine()->getRepository(User::class)->find($request["user_id"]);
        $Order->setUser($user);
        $Order->setStatus('en cours');
        $Order->setOrderPrice($request["order_price"]);
        $adress = $this->getDoctrine()->getRepository(Adress::class)->findOneBy([
            "street" => $request["adress"]["street"],
            "country" => $request["adress"]["country"],
            "postal_code" => $request["adress"]["postal_code"],
            "city" => $request["adress"]["city"],
            "number" => $request["adress"]["number"],
        ]);
        $Order->setAdress($adress); 
        $entityManager->persist($Order);
        $entityManager->flush();

        foreach ($request["articles_id"] as $value) {
            $quantity = $this->getDoctrine()->getRepository(Article::class)->find($value['id']);
            if ($quantity->getQuantity() < $value['quantity']) {
                $data["status"] = "out of stock";
                return $this->json($data);
            } else {
                $quantityfinal  = $quantity->getQuantity() - $value['quantity'];
                $quantity->setQuantity($quantityfinal);
            }
            // for ($i = 0; $i < $value['quantity']; $i++) {
            $article = $this->getDoctrine()->getRepository(Article::class)->find($value['id']);
            $Order->addArticle($article);
            $count = new Count();
            $count->setArticleId($value["id"]);
            $count->setOrderId($Order->getId());
            $count->setQuantity($value["quantity"]);
            $entityManager->persist($count);
            // $count++;
            // }
        }

        $entityManager->flush();
        $data["status"] = "ok";
        return $this->json($data);
    }

    /**
     * @Route("/select/{id}", name="order_selected" , methods={"POST"})
     */
    public function SelectedOrder(Request $request, Order $order,  EntityManagerInterface $entityManager): Response
    {
        $data = [];
        $orderarticle = [];
        foreach ($order->getArticles() as $value) {
            $count =  $this->getDoctrine()->getRepository(Count::class)->findBy(
                [
                    "article_id" => $value->getId(),
                    "order_id" => $order->getId(),
                ]
            )[0]->getQuantity();

            array_push($orderarticle, [
                'id' => $value->getId(),
                'name' => $value->getName(),
                'price' => $value->getPrice(),
                'quantity' => $count,
            ]);
        }
        array_push($data, [
            "id" => $order->getId(),
            "status" => $order->getStatus(),
            "creation_date" => $order->getCreationDate(),
            "user" => [
                "id_user" => $order->getUser()->getId(),
                "email_user" => $order->getUser()->getEmail(),
                "firstname_user" => $order->getUser()->getFirstname(),
                "lastname_user" => $order->getUser()->getLastname(),
            ],
            "article" => $orderarticle,
            "OrderPrice" => $order->getOrderPrice()
        ]);
        return $this->json(['result' => $data]);
    }
    /**
     * @Route("/user/{id}", name="order_user" , methods={"GET"})
     */
    public function SelectedUser(Request $request, User $user): Response
    {
        $orders =  $this->getDoctrine()->getRepository(Order::class)->findBy(["user" => $user->getId()]);
        $data = [];
        $orderarticle = [];
        foreach ($orders as $order) {
            foreach ($order->getArticles() as $value) {
                array_push($orderarticle, [
                    'id' => $value->getId(),
                    'name' => $value->getName(),
                    'price' => $value->getPrice(),
                ]);
            }
            array_push($data, [
                "id" => $order->getId(),
                "status" => $order->getStatus(),
                "creation_date" => $order->getCreationDate(),
                "user" => [
                    "id_user" => $order->getUser()->getId(),
                    "email_user" => $order->getUser()->getEmail(),
                    "firstname_user" => $order->getUser()->getFirstname(),
                    "lastname_user" => $order->getUser()->getLastname(),
                ],
                "article" => $orderarticle,
                "OrderPrice" => $order->getOrderPrice()
            ]);
        }
        return $this->json(['result' => $data]);
    }
    /**
     * @Route("/edit/{id}", name="order", methods={"POST"})
     */
    public function order_edit(Order $order, Request $request): Response
    {
        $request = json_decode($request->getContent(), true);
        $order->setStatus($request["status"]);
        $data = [];
        $orderarticle = [];
        foreach ($order->getArticles() as $value) {
            array_push($orderarticle, [
                'id' => $value->getId(),
                'name' => $value->getName(),
                'price' => $value->getPrice(),
            ]);
        }
        array_push($data, [
            "id" => $order->getId(),
            "status" => $order->getStatus(),
            "creation_date" => $order->getCreationDate(),
            "user" => [
                "id_user" => $order->getUser()->getId(),
                "email_user" => $order->getUser()->getEmail(),
                "firstname_user" => $order->getUser()->getFirstname(),
                "lastname_user" => $order->getUser()->getLastname(),
            ],
            "article" => $orderarticle,
            "OrderPrice" => $order->getOrderPrice()
        ]);
        return $this->json(['result' => $data]);
    }

    /**
     * @Route("/remove/{id}", name="order_remove", methods={"GET"})
     */
    public function remove_order(Order $order, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($order);
        $entityManager->flush();

        $data = "ok";
        return $this->json(['result' => $data]);
    }
}
