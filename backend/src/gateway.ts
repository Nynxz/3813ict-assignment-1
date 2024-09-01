import { CONFIG } from "./config";
import express, { Router } from "express";
import { readdirSync } from "fs";
import cors from "cors";
import { Logger } from "./lib/logger";
import { MongoClient } from "mongodb";
import { config } from "dotenv";
config(); //Load .env file

export type GRouter = Router & {
  gateway: Gateway;
};

// uh this make the thing work, it do the thing and like yeh, makes it work, thanks
export class Gateway {
  app;
  router: GRouter;
  db: MongoClient | undefined = undefined;
  debug = false;
  constructor() {
    Logger.logOrangeUnderline("----Gateway----");
    this.app = express();
    this.router = express.Router() as GRouter;
    this.router.gateway = this;
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
    this.checkDebug();
  }

  checkDebug() {
    if (process.env.DEBUG == "true") {
      this.debug = true;
      Logger.logDebugRed("DEBUG ENABLED");
    }
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
