import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class NewTableGestureSession1765809463397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "gesture_sessions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "started_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "ended_at",
            type: "timestamp",
            isNullable: true,
            default: null,
          },
          {
            name: "status",
            type: "boolean",
            default: true,
          },
          {
            name: "user_ip",
            type: "varchar",
            length: "45",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("gesture_sessions");
  }
}
