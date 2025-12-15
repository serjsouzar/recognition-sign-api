import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTestTable1765735959148 implements MigrationInterface {
  // Método UP: Executa quando você roda a migration (cria a tabela)
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "test_connection",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  // Método DOWN: Executa quando você reverte a migration (apaga a tabela)
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("test_connection");
  }
}
