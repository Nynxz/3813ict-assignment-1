import { Router } from "express";
import { Gateway } from "../gateway";
import { registerHTTP } from "../lib/registerHTTP";
import requireValidRole from "../middleware/requireValidRole";
import { Logger } from "../lib/logger";
import { generateUserJWT } from "../lib/jwt";
import { createUser, findUser, getAllUsers, Roles, User } from "../db/user";
import requireBodyKey from "../middleware/requireBodyKey";
import requireObjectHasKeys from "../middleware/requireObjectHasKeys";

export default (router: Router, gateway: Gateway) => {
  registerHTTP(
    "post",
    "/user/create",
    router,
    async (req, res) => {
      const user = await createUser(req.body.user);
      if (user) {
        res.send({
          jwt: generateUserJWT(user as Partial<User>),
        });
      } else {
        res.status(401).send({ error: "User Exists" });
      }
    },
    [requireObjectHasKeys("user", ["username", "email", "password"])]
  );

  registerHTTP(
    "post",
    "/user/login",
    router,
    async (req, res) => {
      const user = await findUser(req.body.user);
      if (user) {
        res.send({
          jwt: generateUserJWT(user as Partial<User>),
        });
      } else {
        res.status(401).send({ error: "Invalid Login" });
      }
    },
    [requireObjectHasKeys("user", ["username", "password"])]
  );

  registerHTTP(
    "post",
    "/users/all",
    router,
    async (req, res) => {
      const users = await getAllUsers();
      res.send(users);
    },
    [requireValidRole(Roles.SUPER)]
  );

  registerHTTP("post", "/user/update", router, (req, res) => {});
  registerHTTP("post", "/user/delete", router, (req, res) => {}, [
    requireValidRole(Roles.SUPER),
  ]);
};
