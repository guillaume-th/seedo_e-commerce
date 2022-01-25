<?php

namespace App\Entity;

use App\Repository\PhotoRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PhotoRepository::class)
 */
class Photo
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Article::class, inversedBy="photos")
     * @ORM\JoinColumn(nullable=false)
     */
    private $article;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $img_link;

    /**
     * @ORM\ManyToOne(targetEntity=MysteryBox::class, inversedBy="photos")
     */
    private $mysteryBox;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArticle(): ?Article
    {
        return $this->article;
    }

    public function setArticle(?Article $article): self
    {
        $this->article = $article;

        return $this;
    }

    public function getImgLink(): ?string
    {
        return $this->img_link;
    }

    public function setImgLink(string $img_link): self
    {
        $this->img_link = $img_link;

        return $this;
    }

    public function getMysteryBox(): ?MysteryBox
    {
        return $this->mysteryBox;
    }

    public function setMysteryBox(?MysteryBox $mysteryBox): self
    {
        $this->mysteryBox = $mysteryBox;

        return $this;
    }
}
