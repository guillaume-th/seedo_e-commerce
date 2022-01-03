<?php

namespace App\Repository;

use App\Entity\OrdersArticle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method OrdersArticle|null find($id, $lockMode = null, $lockVersion = null)
 * @method OrdersArticle|null findOneBy(array $criteria, array $orderBy = null)
 * @method OrdersArticle[]    findAll()
 * @method OrdersArticle[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrdersArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OrdersArticle::class);
    }

    // /**
    //  * @return OrdersArticle[] Returns an array of OrdersArticle objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?OrdersArticle
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
