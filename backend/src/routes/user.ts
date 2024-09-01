import { Router } from "express";
import { Gateway, GRouter } from "../gateway";
import { registerHTTP } from "../lib/registerHTTP";
import requireValidRole from "../middleware/requireValidRole";
import { Logger } from "../lib/logger";
import { generateUserJWT } from "../lib/jwt";
import { createUser, findUser, Roles, User } from "../db/user";
import requireBodyKey from "../middleware/requireBodyKey";
import requireObjectHasKeys from "../middleware/requireObjectHasKeys";

export default (router: GRouter, gateway: Gateway) => {
  registerHTTP(
    "post",
    "/user/create",
    router,
    async (req, res) => {
      const user = await createUser(gateway.db!, req.body.user);
      res.send(user);
    },
    [requireObjectHasKeys("user", ["username", "email", "password"])]
  );

  registerHTTP(
    "post",
    "/user/login",
    router,
    async (req, res) => {
      const user = await findUser(gateway.db!, req.body.user);
      if (user) {
        res.send({
          jwt: generateUserJWT(user as Partial<User>),
        });
      } else {
        res.status(401).send({ error: "Invalid Login" });
      }
    },
    [requireObjectHasKeys("user", ["email", "password"])]
  );

  registerHTTP("post", "/user/update", router, (req, res) => {});
  registerHTTP("post", "/user/delete", router, (req, res) => {}, [
    requireValidRole(Roles.SUPER),
  ]);
};
