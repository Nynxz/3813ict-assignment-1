import { Gateway } from "../gateway";
import { registerHTTP } from "../lib/registerHTTP";

import { sendMessage } from "../db/message";
import requireObjectHasKeys from "../middleware/requireObjectHasKeys";
import requireValidRole from "../middleware/requireValidRole";
import { Roles, updateUser } from "../db/user";
import { Router } from "express";

export default (router: Router, gateway: Gateway) => {
  registerHTTP(
    "post",
    "/super/updateuser",
    router,
    async (req, res) => {
      let updatedUser = await updateUser(req.body.user);
      res.send(updatedUser);
    },
    [requireValidRole(Roles.SUPER), requireObjectHasKeys("user", ["_id"])]
  );
};
