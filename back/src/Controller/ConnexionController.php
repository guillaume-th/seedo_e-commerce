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

        $User = $this->getDoctrine()
            ->getRepository(User::class)
            ->findBy([
                'email' => $email,
            ]);
        // var_dump($User);
        if ($User) {
            $password_bdd = $User[0]->getPassword();

            if (password_verify($password, $password_bdd)) {
            $id = $User[0]->getId();
                $result = 'ok';
            } else {
                $result = 'fail';
            }
        } else {
            $result = 'fail';
        }
        if(isset($id)){
        return $this->json([
            'status' => $result,
            'user_id' => $id,
            'admin' => $User[0]->getAdmin(),
        ]);
    }else{
        return $this->json([
            'status' => $result,
            'admin' => $User[0]->getAdmin(),
        ]);
    }

    }
}
