<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220126110904 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE abonnement (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, mysterybox_id INT NOT NULL, debut_abonnement TIME DEFAULT NULL, fin_abonnement TIME NOT NULL, UNIQUE INDEX UNIQ_351268BBA76ED395 (user_id), UNIQUE INDEX UNIQ_351268BB8F8E4BB5 (mysterybox_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE color (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, price_modification DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mystery_box (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, subscription_price DOUBLE PRECISION NOT NULL, unit_price DOUBLE PRECISION NOT NULL, elements INT NOT NULL, description VARCHAR(8000) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mystery_box_user (mystery_box_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_EF005C322C1E6FB2 (mystery_box_id), INDEX IDX_EF005C32A76ED395 (user_id), PRIMARY KEY(mystery_box_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE shipping_fees (id INT AUTO_INCREMENT NOT NULL, price_by_kg INT DEFAULT NULL, price_by100_km INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE abonnement ADD CONSTRAINT FK_351268BBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE abonnement ADD CONSTRAINT FK_351268BB8F8E4BB5 FOREIGN KEY (mysterybox_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE mystery_box_user ADD CONSTRAINT FK_EF005C322C1E6FB2 FOREIGN KEY (mystery_box_id) REFERENCES mystery_box (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mystery_box_user ADD CONSTRAINT FK_EF005C32A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE article ADD subscription_price DOUBLE PRECISION DEFAULT NULL, ADD mystery_box TINYINT(1) DEFAULT NULL');
        $this->addSql('ALTER TABLE photo ADD mystery_box_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE photo ADD CONSTRAINT FK_14B784182C1E6FB2 FOREIGN KEY (mystery_box_id) REFERENCES mystery_box (id)');
        $this->addSql('CREATE INDEX IDX_14B784182C1E6FB2 ON photo (mystery_box_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mystery_box_user DROP FOREIGN KEY FK_EF005C322C1E6FB2');
        $this->addSql('ALTER TABLE photo DROP FOREIGN KEY FK_14B784182C1E6FB2');
        $this->addSql('DROP TABLE abonnement');
        $this->addSql('DROP TABLE color');
        $this->addSql('DROP TABLE mystery_box');
        $this->addSql('DROP TABLE mystery_box_user');
        $this->addSql('DROP TABLE shipping_fees');
        $this->addSql('ALTER TABLE article DROP subscription_price, DROP mystery_box');
        $this->addSql('DROP INDEX IDX_14B784182C1E6FB2 ON photo');
        $this->addSql('ALTER TABLE photo DROP mystery_box_id');
    }
}
