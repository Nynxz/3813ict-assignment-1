import { Request, Response, Router } from "express";

type RouterMethods = "get" | "set" | "delete" | "head" | "post";

export function registerHTTP(
  method: RouterMethods,
  endpoint: string,
  router: Router,
  callback: (req: Request, res: Response) => void
) {
  console.log(`++ (${method.toUpperCase()}) ${endpoint}`);
  (router as any)[method](endpoint, (req: Request, res: Response) => {
    callback(req, res);
  });
}
