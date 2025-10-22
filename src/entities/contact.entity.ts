import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 120 })
  name!: string;

  @Column({ length: 120 })
  email!: string;

  @Column({ length: 15 })
  phone!: string;

  @Column({ length: 120 })
  enterprise!: string;

  @Column({ type: "text" })
  message!: string;

  @CreateDateColumn({
    type: "timestamp",
    precision: 0,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;
}
