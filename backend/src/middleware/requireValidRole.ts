import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Roles } from "../db/user";

export default (role: Roles) => {
  return function (req: Request, res: Response, next: NextFunction) {
    // decode jwt, validate, get roles array, check if array contains required role
    if (req.body.jwt) {
      const jwtRoles = verify(req.body.jwt, "thisisasecret:):)") as {
        roles: Roles[];
      };
      if (jwtRoles.roles.includes(role)) {
        next();
      } else {
        res.status(400).send({ error: "Invalid JWT Role: " + Roles[role] });
      }
    } else {
      res.status(400).send({ error: "No given JWT" });
    }
  };
};
