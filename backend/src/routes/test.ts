import { Request, Response, Router } from "express";
import { registerHTTP } from "../lib/registerHTTP";
import { Gateway } from "../gateway";
import { createServer, findServers, updateServer } from "../lib/db";
import { MongoClient } from "mongodb";
import { verify } from "jsonwebtoken";
import { requireBodyKey, requireCool, requireHello } from "../lib/middleware";

// TODO: Move server shit out of test.ts into actual 'server.ts' file
export default (router: Router, gateway: Gateway) => {
  registerHTTP("get", "/", router, (req, res) => {
    res.send("Connected to Backend");
  });

  registerHTTP("get", "/servers", router, async (req, res) => {
    // TODO, take JWT, give servers accessible to user of JWT, or P.O
    res.send(await findServers(gateway.db as MongoClient));
  });

  registerHTTP("post", "/createserver", router, async (req, res) => {
    // TODO: anyone can create a server right now,
    // setup JWT middleware or something, 'SuperONLY > AdminONLY > UserONLY`
    const server = await createServer(
      gateway.db as MongoClient,
      req.body.serverName as String
    );
    res.send("Complete " + JSON.stringify(server));
  });

  registerHTTP("post", "/server/update", router, async (req, res) => {
    console.log("GOT REQUEST");
    console.log(req.body);
    //TODO: averygoodaverynice, but this IS NOT ROLE RESTRICTED
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

  //TODO: table tennis kinda bad, to remove
  registerHTTP(
    "get",
    "/ping",
    router,
    async (req, res) => {
      console.log("GOT PING");
      res.send("pong");
    },
    [requireBodyKey({ key: "hello" })]
  );

  registerHTTP(
    "get",
    "/hello",
    router,
    async (req: Request, res: Response) => {
      res.send(`Hello ${req.body.name}`);
    },
    [requireBodyKey({ key: "name" })]
  );
};
