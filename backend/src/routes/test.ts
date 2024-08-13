import { Router } from "express";
import { registerHTTP } from "../lib/registerHTTP";
import { Gateway } from "../gateway";

export default (router: Router, gateway: Gateway) => {
  registerHTTP("get", "/", router, (req, res) => {
    res.send("Hello World!");
  });
};
