<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Adress;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/user")
 */
class UserController extends AbstractController
{

    /**
     * @Route("/new", name="user_new", methods={"GET", "POST"})
     */
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
    }

    /**
     * @Route("/{id}", name="user", methods={"GET"})
     */
    public function show(User $user): Response
    {
        return $this->json([
            "lastname" => $user->getLastname(),
            "firstname" => $user->getFirstname(),
            "email" => $user->getEmail(),
            "telephone" => $user->getTelephone(),
            "id" => $user->getId(),
            "creation_date" => $user->getCreationDate(),
            "cvv" => $user->getCvv(),
            "expiration_CB" => $user->getExpirationCB(),
            "numberCB" => $user->getNumberCB(),
        ]);
    }

    /**
     * @Route("/{id}/edit", name="user_edit", methods={"GET", "POST"})
     */
    public function edit(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {
        $user->setEmail($request->request->get('email'));
        $user->setPassword($request->request->get('password'));
        $user->setTelephone($request->request->get('telephone'));
        $user->setFirstname($request->request->get('firstname'));
        $user->setLastname($request->request->get('lastname'));
        $user->setCvv($request->request->get('cvv'));
        $user->setExpirationCB($request->request->get('expiration_CB'));
        $user->setNumberCB($request->request->get('number_CB'));
        $entityManager->flush();

        return $this->json([
            "status" => "ok",
            "data" => [
                "lastname" => $user->getLastname(),
                "firstname" => $user->getFirstname(),
                "email" => $user->getEmail(),
                "telephone" => $user->getTelephone(),
                "id" => $user->getId(),
                "creation_date" => $user->getCreationDate(),
                "cvv" => $user->getCvv(),
                "expiration_CB" => $user->getExpirationCB(),
                "numberCB" => $user->getNumberCB(),
            ]
        ]);
    }

    /**
     * @Route("/{id}/adress", name="adress_new", methods={"GET", "POST"})
     */
    public function addAdress(Request $request, User $user,  EntityManagerInterface $entityManager): Response
    {
        $adress = new Adress();
        $adress->setStreet($request->request->get("street"));
        $adress->setNumber($request->request->get("number"));
        $adress->setCountry($request->request->get("country"));
        $adress->setPostalCode($request->request->get("postal_code"));
        $user->addAdress($adress); 
        $entityManager->persist($adress); 
        $entityManager->persist($user); 
        $entityManager->flush(); 

        return $this->json([
            "status" => "ok",
        ]);
    }

    /**
     * @Route("/{id}/adress/edit", name="adress_edit", methods={"GET", "POST"})
     */
    public function editAdress(Request $request, Adress $adress,  EntityManagerInterface $entityManager): Response
    {
        $adress->setStreet($request->request->get("street"));
        $adress->setNumber($request->request->get("number"));
        $adress->setCountry($request->request->get("country"));
        $adress->setPostalCode($request->request->get("postal_code"));
        $entityManager->flush();

        return $this->json([
            "status" => "ok",
        ]);
    }

    /**
     * @Route("/delete/{id}", name="user_delete", methods={"POST"})
     */
    public function delete(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($user); 
        $entityManager->flush(); 
        return $this->json(["status" => "ok"]); 
    }
}
