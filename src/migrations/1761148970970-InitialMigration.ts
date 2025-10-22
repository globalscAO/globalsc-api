import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1761148970970 implements MigrationInterface {
    name = 'InitialMigration1761148970970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contact\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(120) NOT NULL, \`email\` varchar(120) NOT NULL, \`phone\` varchar(15) NOT NULL, \`enterprise\` varchar(120) NOT NULL, \`message\` text NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`contact\``);
    }

}
