import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Roles } from "../db/user";

export default (role: Roles) => {
  return function (req: Request, res: Response, next: NextFunction) {
    // decode jwt, validate, get roles array, check if array contains required role
    if (req.body.jwt) {
      const jwt = verify(req.body.jwt, "thisisasecret:):)") as {
        roles: Roles[];
      };
      console.log(jwt);
      if (jwt.roles && jwt.roles.includes(role)) {
        res.locals.jwt = jwt;
        next();
      } else {
        res.status(401);
        res.send({ error: "Invalid JWT Role: " + Roles[role] });
      }
    } else {
      res.status(400).send({ error: "No given JWT" });
    }
  };
};
