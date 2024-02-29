import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Thread } from "./Thread";
import { Reply } from "./Reply";
import { Follow } from "./Follow";
import { Like } from "./Like";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  cover_photo: string;

  @Column({ nullable: true })
  bio: string;

  @OneToMany(() => Follow, (follow) => follow.follower)
  follower: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  following: Follow[];

  @OneToMany(() => Thread, (thread) => thread.author)
  threads: Thread[];

  @OneToMany(() => Like, (like) => like.author)
  likes: Like[];

  @OneToMany(() => Reply, (reply) => reply.author)
  replies: Reply[];

  @Column({ default: () => "now()" })
  created_at: Date;
}
