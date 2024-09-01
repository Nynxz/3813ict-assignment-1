import { Request, Response, Router } from "express";
import { registerHTTP } from "../lib/registerHTTP";
import { Gateway, GRouter } from "../gateway";
import requireValidRole from "../middleware/requireValidRole";
import requireBodyKey from "../middleware/requireBodyKey";
import { Roles } from "../db/user";

export default (router: GRouter, gateway: Gateway) => {
  registerHTTP("get", "/", router, (req, res) => {
    res.send("Connected to Backend");
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
    [requireBodyKey("hello")]
  );

  registerHTTP(
    "get",
    "/hello",
    router,
    async (req: Request, res: Response) => {
      res.send(`Hello ${req.body.name}`);
    },
    [requireBodyKey("name")]
  );

  registerHTTP(
    "get",
    "/jwttest",
    router,
    async (req: Request, res: Response) => {
      res.send(`Hello ${req.body.name}`);
    },
    [requireValidRole(Roles.NOBODY)]
  );
};
