import { NextFunction, Request, Response } from "express";
import { Roles } from "../routes/login";
import { verify } from "jsonwebtoken";

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
        res.send("Invalid JWT Role: " + Roles[role]);
      }
    } else {
      res.send("No given JWT");
    }
  };
};
