import type { MigrationInterface, QueryRunner } from 'typeorm';
import { TableColumn } from 'typeorm';

export class AddMissingColumnsToArticle1752146391297
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('article', [
      new TableColumn({
        name: 'perex',
        type: 'text',
        isNullable: true,
      }),
      new TableColumn({
        name: 'is_published',
        type: 'boolean',
        default: false,
      }),
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('article', 'perex');
    await queryRunner.dropColumn('article', 'is_published');
    await queryRunner.dropColumn('article', 'created_at');
    await queryRunner.dropColumn('article', 'updated_at');
  }
}
