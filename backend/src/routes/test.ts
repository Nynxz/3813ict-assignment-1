import { Router } from "express";
import { registerHTTP } from "../lib/registerHTTP";
import { Gateway } from "../gateway";
import { createServer, findServers, updateServer } from "../lib/db";
import { MongoClient } from "mongodb";
import { verify } from "jsonwebtoken";

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

  registerHTTP("post", "/server/update", router, async (req, res) => {
    console.log("GOT REQUEST");
    console.log(req.body);
    try {
      const decodedJWT = verify(req.body.jwt, "thisisasecret:):)");
      console.log(decodedJWT);
      const server = await updateServer(gateway.db as MongoClient, req.body);
      res.send(server);
    } catch (error) {
      console.log(error);
      res.statusCode = 401;
      res.send(JSON.stringify({ error: "invalid JWT" }));
    }
  });

  registerHTTP("get", "/ping", router, async (req, res) => {
    console.log("GOT PING");
    res.send("pong");
  });
};
