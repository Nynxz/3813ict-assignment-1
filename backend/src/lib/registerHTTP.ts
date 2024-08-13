import { Request, Response, Router } from "express";

type RouterMethods = "get" | "set" | "delete" | "head" | "post";

export function registerHTTP(
  method: RouterMethods,
  endpoint: string,
  router: Router,
  callback: (req: Request, res: Response) => void
) {
  Logger.logGreenUnderline(`++ (${method.toUpperCase()}) ${endpoint}`);
  // same as router.get(), etc, just called dynamically and saves using switch/if else
  (router as any)[method](endpoint, (req: Request, res: Response) => {
    callback(req, res);
  });
}
