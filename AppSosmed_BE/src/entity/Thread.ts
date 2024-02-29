import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Reply } from "./Reply";
import { User } from "./User";
import { Like } from "./Like";

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 160, nullable: true })
  content: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Like, (like) => like.thread)
  like: Like[];

  @OneToMany(() => Reply, (reply) => reply.thread)
  replies: Reply[];

  @ManyToOne(() => User, (user) => user.threads, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  author: User;

  @Column({ default: () => "now()" })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
