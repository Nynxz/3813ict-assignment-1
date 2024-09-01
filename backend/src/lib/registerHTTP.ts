import { Request, Response, Router, IRouter } from "express";
import { Gateway } from "../gateway";
import { Logger } from "./logger";
import { Middleware } from "./middleware";
/**
 * Enum for the {@link IRouter} methods
 */
type RouterMethod = "get" | "set" | "delete" | "head" | "post";

/**
 * A wrapper to conveniently create endpoints
 * @param {RouterMethod} method type of {@link RouterMethod} eg `get` or `set`
 * @param endpoint the endpoint eg `/` or `/api/hello`
 * @param router the express {@link Router} to bind the route to
 * @param callback the callback to execute when the route is hit
 * ---
 * ## **EXAMPLE**
 * Creating a .ts file in `src/routes/` with a default
 * export of type `(Router, Gateway) => void`, will allow
 * the {@link Gateway} to autoload all routes created with {@link registerHTTP}
 * @example
 * //src/routes/<any>.ts
 * export default (router: Router, gateway: Gateway) => {
 *  registerHTTP("get", "/", router, (req, res) => {
 *    res.send("Hello World!");
 *  });
 * };
 */
export function registerHTTP(
  method: RouterMethod,
  endpoint: string,
  router: Router,
  callback: (req: Request, res: Response) => void,
  middlewares?: Array<Middleware>
) {
  Logger.logGreenUnderline(`++ (${method.toUpperCase()}) ${endpoint}`);
  // same as router.get(), etc, just called dynamically and saves using switch/if else
  (router as any)[method](endpoint, (req: Request, res: Response) => {
    // Add callback to end of middlewares
    const runMiddleware = (index: number) => {
      if (index < (middlewares?.length || 0)) {
        middlewares![index](req, res, () => runMiddleware(index + 1));
      } else {
        callback(req, res);
      }
    };

    runMiddleware(0);
    //can add anything you want here to always be 'done' with every request (ie. metrics, middleware etc)
    // TODO: add middleware optional parameter array, use before callback to add things like easy JWT auth
  });
}
