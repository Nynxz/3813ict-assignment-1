import { Router } from "express";
import { registerHTTP } from "../lib/registerHTTP";
import { Gateway } from "../gateway";
import { createServer, findServers } from "../lib/db";
import { MongoClient } from "mongodb";

export default (router: Router, gateway: Gateway) => {
  registerHTTP("get", "/", router, (req, res) => {
    res.send("Connected to Backend");
  });

  registerHTTP("get", "/servers", router, async (req, res) => {
    res.send(await findServers(gateway.db as MongoClient));
  });

  registerHTTP("post", "/createserver", router, async (req, res) => {
    const server = await createServer(
      gateway.db as MongoClient,
      req.body.serverName as String
    );
    res.send("Complete " + JSON.stringify(server));
  });
};
