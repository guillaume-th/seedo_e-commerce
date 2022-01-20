<?php

namespace App\Repository;

use App\Entity\ShippingFees;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ShippingFees|null find($id, $lockMode = null, $lockVersion = null)
 * @method ShippingFees|null findOneBy(array $criteria, array $orderBy = null)
 * @method ShippingFees[]    findAll()
 * @method ShippingFees[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ShippingFeesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ShippingFees::class);
    }

    // /**
    //  * @return ShippingFees[] Returns an array of ShippingFees objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ShippingFees
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
