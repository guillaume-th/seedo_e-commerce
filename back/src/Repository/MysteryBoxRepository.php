<?php

namespace App\Repository;

use App\Entity\MysteryBox;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MysteryBox|null find($id, $lockMode = null, $lockVersion = null)
 * @method MysteryBox|null findOneBy(array $criteria, array $orderBy = null)
 * @method MysteryBox[]    findAll()
 * @method MysteryBox[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MysteryBoxRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MysteryBox::class);
    }

    // /**
    //  * @return MysteryBox[] Returns an array of MysteryBox objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MysteryBox
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
