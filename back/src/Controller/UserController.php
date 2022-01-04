<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
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
     * @Route("/", name="user_index", methods={"GET"})
     */
    public function index(UserRepository $userRepository): Response
    {
        return $this->render('user/index.html.twig', [
            'users' => $userRepository->findAll(),
        ]);
    }

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

                $entityManager->persist($user);

                $entityManager->flush();

                return $this->json([
                    'status' => "ok",
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
        $user->setPassword($request->request->get('password'));
        $user->setPassword($request->request->get('password'));
        $user->setPassword($request->request->get('password'));
        $entityManager->flush();
        return $this->json([
            "status" => "ok",
        ]);
    }

    /**
     * @Route("/{id}", name="user_delete", methods={"POST"})
     */
    public function delete(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $user->getId(), $request->request->get('_token'))) {
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('user_index', [], Response::HTTP_SEE_OTHER);
    }
}
