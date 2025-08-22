import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserProfile1755900900733 implements MigrationInterface {
  name = "AddUserProfile1755900900733";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_profile" (
                "id" uuid NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user_profile"
        `);
  }
}
