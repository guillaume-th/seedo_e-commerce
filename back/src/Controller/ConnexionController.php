<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;

class ConnexionController extends AbstractController
{
    /**
     * @Route("/connexion", name="connexion" , methods={"POST"})
     */
    public function index(): Response
    {
        $request = Request::createFromGlobals();
        $request->getPathInfo();
        $email = $request->request->get('email');
        $password = $request->request->get('password');
        // var_dump($request);

        $User = $this->getDoctrine()
            ->getRepository(User::class)
            ->findBy([
                'email' => $email,
            ]);
        var_dump($User);
        if ($User) {
            $password_bdd = $User->get('password');

            if (password_verify(password_hash($password, PASSWORD_DEFAULT), $$password_bdd)) {
                $result = 'ok';
            } else {
                $result = 'fail';
            }
        } else {
            $result = 'fail';
        }
        return $this->json([
            'message' => $result,
        ]);
    }
}
