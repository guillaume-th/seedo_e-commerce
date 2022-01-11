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
     * @Route("/inscription", name="user_new", methods={"GET", "POST"})
     */
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {

        $email = $request->request->get('email');
        $password = $request->request->get('password');
        $confirm_password = $request->request->get('confirm_password');
        $firstname = $request->request->get('firstname');
        $lastname = $request->request->get('lastname');
        $creation_date = new \DateTime();

        $mail = $this->getDoctrine()
            ->getRepository(User::class)
            ->findBy([
                'email' => $email,
            ]);

        if (!$mail) {
            if ($confirm_password == $password) {
                $password = password_hash($password, PASSWORD_DEFAULT);
                $user = new User();
                $user->setemail($email);
                $user->setFirstname($firstname);
                $user->setLastname($lastname);
                $user->setPassword($password);
                $user->setCreationDate($creation_date);
                $user->setAdmin(false);

                $entityManager->persist($user);

                $entityManager->flush();

                $User = $this->getDoctrine()
                    ->getRepository(User::class)
                    ->findBy([
                        'email' => $email,
                    ]);

                return $this->json([
                    'status' => "ok",
                    'user_id' => $User[0]->getId(),
                    'admin' => $User[0]->getAdmin(),
                ]);
            } else {
                return $this->json([
                    'status' => "passwords dont match",
                ]);
            }
        } else {
            return $this->json([
                'status' => "email taken",
            ]);
        }
    }

    /**
     * @Route("/{id}", name="user", methods={"GET"})
     */
    public function show(User $user): Response
    {
        return $this->json($this->getUserData($user));
    }

    /**
     * @Route("/{id}/edit", name="user_edit", methods={"GET", "POST"})
     */
    public function edit(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {

        $email = $request->request->get('email');
        $pass = $request->request->get('password');
        $tel = $request->request->get('telephone');
        $firstname = $request->request->get('firstname');
        $lastname = $request->request->get('lastname');
        $cvv = $request->request->get('cvv');
        $expiration = $request->request->get('expiration_CB');
        $number = $request->request->get('number_CB');


        $adresses = [];
        foreach ($user->getAdresses() as $adress) {
            array_push($adresses, [
                "street" => $adress->getStreet(),
                "number" => $adress->getNumber(),
                "country" => $adress->getCountry(),
                "postal_code" => $adress->getPostalCode(),
                "city" => $adress->getCity(),
            ]);
        }

        if ($email !== "")
            $user->setEmail($email);
        // if ($pass !== "")
        //     $user->setPassword(password_hash($pass, PASSWORD_DEFAULT));
        if ($tel !== "")
            $user->setTelephone($tel);
        if ($firstname !== "")
            $user->setFirstname($firstname);
        if ($lastname !== "")
            $user->setLastname($lastname);
        if ($cvv !== "")
            $user->setCvv($cvv);
        if ($expiration !== "")
            $user->setExpirationCB($expiration);
        if ($number !== "")
            $user->setNumberCB($number);

        $entityManager->flush();
        $data = $this->getUserData($user);
        $data["status"] = "ok";
        return $this->json($data);
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
        $adress->setCity($request->request->get("city"));
        $adress->setPostalCode($request->request->get("postal_code"));
        $user->addAdress($adress);
        $entityManager->persist($adress);
        $entityManager->persist($user);
        $entityManager->flush();

        $data = $this->getUserData($user);
        $data["status"] = "ok";
        return $this->json($data);
    }


    /**
     * @Route("/adress/{id}/edit", name="adress_edit", methods={"GET", "POST"})
     */
    public function editAdress(Request $request, Adress $adress,  EntityManagerInterface $entityManager): Response
    {
        $adress->setStreet($request->request->get("street"));
        $adress->setNumber($request->request->get("number"));
        $adress->setCity($request->request->get("city"));
        $adress->setCountry($request->request->get("country"));
        $adress->setPostalCode($request->request->get("postal_code"));
        $entityManager->flush();
        $user = $this->getDoctrine()->getRepository(User::class)->find($request->request->get("user_id"));
        $data = $this->getUserData($user);
        $data["status"] = "ok";
        return $this->json($data);
    }

    /**
     * @Route("/delete/{id}", name="user_delete", methods={"POST"})
     */
    public function delete(User $user, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($user);
        $entityManager->flush();
        return $this->json(["status" => "ok"]);
    }


    public function getUserData(User $user)
    {
        $adresses = [];
        foreach ($user->getAdresses() as $adress) {
            array_push($adresses, [
                "street" => $adress->getStreet(),
                "number" => $adress->getNumber(),
                "country" => $adress->getCountry(),
                "postal_code" => $adress->getPostalCode(),
                "city" => $adress->getCity(),
                "id" => $adress->getId(),
            ]);
        }

        return [
            "data" => [
                "lastname" => $user->getLastname(),
                "firstname" => $user->getFirstname(),
                "email" => $user->getEmail(),
                "telephone" => $user->getTelephone(),
                "id" => $user->getId(),
                "creation_date" => $user->getCreationDate(),
                "cvv" => $user->getCvv(),
                "expiration_CB" => $user->getExpirationCB(),
                "number_CB" => $user->getNumberCB(),
                "adresses" => $adresses,
                "admin" => $user->getAdmin()
            ]
        ];
    }
}
