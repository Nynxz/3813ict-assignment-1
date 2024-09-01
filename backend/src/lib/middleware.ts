import { NextFunction, Request, Response } from "express";
import { Roles } from "../routes/login";
import { verify } from "jsonwebtoken";

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const requireValidRole = (role: Roles) => {
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

export const requireBodyKey = (options: { key: string }) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if ((req.body as Object).hasOwnProperty(options.key)) {
      next();
    } else {
      res.send("Cannot find " + options.key);
    }
  };
};

export const requireValidJWT: Middleware = (req: Request, res: Response) => {
  if (req.body) {
    console.log(req.body);
  }
};

export const requireHello: Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("require hello");
  if (req.body.hello) {
    next();
  } else {
    res.send("Requires: 'hello' key :)");
  }
};

export const requireCool: Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("require cool");
  if (req.body.cool) {
    next();
  } else {
    res.send("Requires: 'cool' key :)");
  }
};
