<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220125150059 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE abonnement (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, mysterybox_id INT NOT NULL, debut_abonnement TIME DEFAULT NULL, fin_abonnement TIME NOT NULL, UNIQUE INDEX UNIQ_351268BBA76ED395 (user_id), UNIQUE INDEX UNIQ_351268BB8F8E4BB5 (mysterybox_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE abonnement ADD CONSTRAINT FK_351268BBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE abonnement ADD CONSTRAINT FK_351268BB8F8E4BB5 FOREIGN KEY (mysterybox_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE article ADD subscription_price DOUBLE PRECISION DEFAULT NULL, ADD mystery_box TINYINT(1) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE abonnement');
        $this->addSql('ALTER TABLE article DROP subscription_price, DROP mystery_box');
    }
}
