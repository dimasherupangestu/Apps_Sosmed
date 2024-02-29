import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Like } from "./Like";
import { Thread } from "./Thread";

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 160, nullable: true })
  content: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Thread, (thread) => thread.replies, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  thread: Thread;

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  author: User;

  @OneToMany(() => Like, (like) => like.reply)
  like: Like[];

  @OneToMany(() => Reply, (reply) => reply.reply)
  replies: Reply[];

  @ManyToOne(() => Reply, (reply) => reply.replies, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  reply: Reply;

  @Column({ default: () => "now()" })
  created_at: Date;
}
