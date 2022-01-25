<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220124162121 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE mystery_box (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, subscription_price DOUBLE PRECISION NOT NULL, unit_price DOUBLE PRECISION NOT NULL, elements INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mystery_box_user (mystery_box_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_EF005C322C1E6FB2 (mystery_box_id), INDEX IDX_EF005C32A76ED395 (user_id), PRIMARY KEY(mystery_box_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE mystery_box_user ADD CONSTRAINT FK_EF005C322C1E6FB2 FOREIGN KEY (mystery_box_id) REFERENCES mystery_box (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mystery_box_user ADD CONSTRAINT FK_EF005C32A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE photo ADD mystery_box_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE photo ADD CONSTRAINT FK_14B784182C1E6FB2 FOREIGN KEY (mystery_box_id) REFERENCES mystery_box (id)');
        $this->addSql('CREATE INDEX IDX_14B784182C1E6FB2 ON photo (mystery_box_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mystery_box_user DROP FOREIGN KEY FK_EF005C322C1E6FB2');
        $this->addSql('ALTER TABLE photo DROP FOREIGN KEY FK_14B784182C1E6FB2');
        $this->addSql('DROP TABLE mystery_box');
        $this->addSql('DROP TABLE mystery_box_user');
        $this->addSql('DROP INDEX IDX_14B784182C1E6FB2 ON photo');
        $this->addSql('ALTER TABLE photo DROP mystery_box_id');
    }
}
