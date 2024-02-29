import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.follower, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  follower: User;

  @ManyToOne(() => User, (user) => user.following, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  following: User;
}
