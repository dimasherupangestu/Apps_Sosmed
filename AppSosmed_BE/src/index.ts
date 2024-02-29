import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import * as cors from "cors";
import * as express from "express";
import "dotenv/config";
import routes from "./route";
AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(
      cors({
        credentials: true,
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PACTH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
        preflightContinue: true,
      })
    );
    app.use(express.json());
    app.use("/api/v1", routes);

    app.listen(5000, () => {
      console.log(`Server is running on port `);
    });
  })
  .catch((error) => console.log(error));
