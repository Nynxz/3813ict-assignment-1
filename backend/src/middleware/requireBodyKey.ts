import { NextFunction, Request, Response } from "express";

export default (key: string) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if ((req.body as Object).hasOwnProperty(key)) {
      next();
    } else {
      res.send("Cannot find " + key);
    }
  };
};
