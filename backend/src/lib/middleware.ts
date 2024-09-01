import { NextFunction, Request, Response } from "express";
import { Roles } from "../routes/login";

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const requireValidRole = (options: { role: Roles }) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if ((req.body.roles as any[]).includes(options.role)) {
      next();
    } else {
      res.send("Invalid JWT Role!");
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
