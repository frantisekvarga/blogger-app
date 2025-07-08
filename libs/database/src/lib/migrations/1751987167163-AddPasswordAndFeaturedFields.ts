import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPasswordField1751987167163
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "password" character varying(255)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
