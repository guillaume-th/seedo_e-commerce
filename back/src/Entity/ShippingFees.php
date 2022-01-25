<?php

namespace App\Entity;

use App\Repository\ShippingFeesRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ShippingFeesRepository::class)
 */
class ShippingFees
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $priceByKg;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $priceBy100Km;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPriceByKg(): ?int
    {
        return $this->priceByKg;
    }

    public function setPriceByKg(?int $priceByKg): self
    {
        $this->priceByKg = $priceByKg;

        return $this;
    }

    public function getPriceBy100Km(): ?int
    {
        return $this->priceBy100Km;
    }

    public function setPriceBy100Km(?int $priceBy100Km): self
    {
        $this->priceBy100Km = $priceBy100Km;

        return $this;
    }
}
