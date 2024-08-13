import { CONFIG } from "./config";

import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
import { Logger } from "./lib/logger";

export class Gateway {
  app;
  router;

  constructor() {
    Logger.logOrangeUnderline("----Gateway----");
    this.app = express();
    this.router = express.Router();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
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
