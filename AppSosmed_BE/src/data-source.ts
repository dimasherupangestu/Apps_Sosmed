import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "monorail.proxy.rlwy.net",
  port: 19339,
  username: "postgres",
  password: "ArmHFykDXZBxTDaSxtCIBPCPoggSeZjR",
  database: "railway",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
});
