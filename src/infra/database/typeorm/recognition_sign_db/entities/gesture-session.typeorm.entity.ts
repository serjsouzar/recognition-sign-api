import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("gesture_sessions")
export class GestureSessionTypeOrmEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @CreateDateColumn({
    name: "started_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  startedAt!: Date;

  @Column({
    name: "ended_at",
    type: "timestamp",
    nullable: true,
    default: null,
  })
  endedAt!: Date | null;

  @Column({
    name: "status",
    type: "boolean",
    default: true,
  })
  status!: boolean;

  @Column({
    name: "user_ip",
    type: "varchar",
    length: 45,
  })
  userIp!: string;
}
