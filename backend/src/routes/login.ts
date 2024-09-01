import { Router } from "express";
import { registerHTTP } from "../lib/registerHTTP";
import { Gateway } from "../gateway";
import { Logger } from "../lib/logger";
import { sign } from "jsonwebtoken";

export enum Roles {
  "USER",
  "ADMIN",
  "SUPER",
  "NOBODY",
}

type Group = {
  name: string;
};

type User = {
  username: string;
  email: string;
  password: string;
  roles?: Roles[];
  groups?: Group[];
};

export default (router: Router, gateway: Gateway) => {
  const users: User[] = [
    {
      email: "super@super.com",
      password: "123",
      username: "super",
      roles: [Roles.SUPER, Roles.ADMIN],
    },
    {
      email: "normie@normie.com",
      password: "123",
      username: "normie",
      roles: [],
    },
  ];

  registerHTTP("post", "/login", router, (req, res) => {
    Logger.logGreenUnderline("GOT POST");
    const resBody = req.body as { email: string; password: string };
    const user = users.find(
      (e) => e.email == resBody.email && e.password == resBody.password
    );
    if (user) {
      res.send(
        JSON.stringify({
          jwt: generateJWT(user.username, user.roles!),
        })
      );
    } else {
      res.status(401);
      res.send("Error!");
    }
  });
};

const generateJWT = (username: string, roles: Roles[]) => {
  return sign({ username, roles }, "thisisasecret:):)", { expiresIn: "10h" });
};
