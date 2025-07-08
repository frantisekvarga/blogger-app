import { MigrationInterface, QueryRunner,Table ,TableForeignKey } from "typeorm";

export class CreateArticleTable1751970889193 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
      new Table({
        name: "article",
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "title",
            type: "varchar",
            length: "150",
          },
          {
            name: "image_url",
            type: "text",
          },
          {
            name: "content",
            type: "text",
          },
          {
            name: "user_id",
            type: "integer",
          },
          {
            name: "published_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "article",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable('article');

    }

}
