<?php

namespace App\Entity;

use App\Repository\AbonnementRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AbonnementRepository::class)
 */
class Abonnement
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="abonnement", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\OneToOne(targetEntity=Article::class, inversedBy="abonnement", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $mysterybox;

    /**
     * @ORM\Column(type="time", nullable=true)
     */
    private $debutAbonnement;

    /**
     * @ORM\Column(type="time")
     */
    private $finAbonnement;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getMysterybox(): ?Article
    {
        return $this->mysterybox;
    }

    public function setMysterybox(Article $mysterybox): self
    {
        $this->mysterybox = $mysterybox;

        return $this;
    }

    public function getDebutAbonnement(): ?\DateTimeInterface
    {
        return $this->debutAbonnement;
    }

    public function setDebutAbonnement(?\DateTimeInterface $debutAbonnement): self
    {
        $this->debutAbonnement = $debutAbonnement;

        return $this;
    }

    public function getFinAbonnement(): ?\DateTimeInterface
    {
        return $this->finAbonnement;
    }

    public function setFinAbonnement(\DateTimeInterface $finAbonnement): self
    {
        $this->finAbonnement = $finAbonnement;

        return $this;
    }
}
