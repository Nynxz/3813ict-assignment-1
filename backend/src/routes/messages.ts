import { Gateway } from "../gateway";
import { registerHTTP } from "../lib/registerHTTP";

import { sendMessage } from "../db/message";
import requireObjectHasKeys from "../middleware/requireObjectHasKeys";
import requireValidRole from "../middleware/requireValidRole";
import { Roles } from "../db/user";
import { Router } from "express";

export default (router: Router, gateway: Gateway) => {
  registerHTTP(
    "post",
    "/message/send",
    router,
    async (req, res) => {
      //get the groups of the user who requested
      res.send(
        await sendMessage(
          req.body.message.content,
          req.body.message.channel,
          res.locals.jwt._id
        )
      );
    },
    [
      requireValidRole(Roles.USER),
      requireObjectHasKeys("message", ["content", "channel"]),
    ]
  );
};
