import { CONFIG } from "./config";
import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
import { Logger } from "./lib/logger";
import { MongoClient } from "mongodb";
import { config } from "dotenv";
import { findServers } from "./lib/db";
config(); //Load .env file

// uh this make the thing work, it do the thing and like yeh, makes it work, thanks
export class Gateway {
  app;
  router;
  db: MongoClient | undefined = undefined;

  constructor() {
    Logger.logOrangeUnderline("----Gateway----");
    this.app = express();
    this.router = express.Router();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
  }

  async connectToMongoDB() {
    if (this.db != undefined) return;
    try {
      Logger.logGreen("Connecting to MongoDB...");
      const uri = process.env.MONGODB_URI as string;
      const mongoDB = new MongoClient(uri);
      await mongoDB.connect();
      Logger.logGreen("Connected");
      this.db = mongoDB;
    } catch (error) {
      Logger.logRed("MongoDB Connection Error");
    }
  }

  async loadRoutes() {
    Logger.logOrange("Loading Routes:");
    await this._loadRoutesFolder();
    this.app.use(this.router);
  }

  async start() {
    await this.loadRoutes();
    this.app.listen(CONFIG.PORT, () => {
      Logger.logOrange(`Listening on port ${CONFIG.PORT}`);
    });
  }

  // Load /src/routes/*.ts files
  async _loadRoutesFolder() {
    const routesDir = "./src/routes";
    const routeFiles = readdirSync(routesDir).filter((file) =>
      file.endsWith(".ts")
    );
    for (const file of routeFiles) {
      const registerRoutes = await import("./routes/" + file);
      const registerFunc = registerRoutes.default;
      if (typeof registerFunc === "function") {
        registerFunc(this.router, this);
      }
    }
  }
}
