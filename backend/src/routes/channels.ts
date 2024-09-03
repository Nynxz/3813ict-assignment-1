import { Gateway } from "../gateway";
import { registerHTTP } from "../lib/registerHTTP";
import {
  createChannel,
  deleteChannel,
  getChannelsForGroup,
  updateChannel,
} from "../db/channel";
import { getMessagesForChannel } from "../db/message";
import requireValidRole from "../middleware/requireValidRole";
import { Roles } from "../db/user";
import { Router } from "express";

export default (router: Router, gateway: Gateway) => {
  registerHTTP("post", "/channel/create", router, async (req, res) => {
    //get the groups of the user who requested
    res.send(await createChannel(req.body.channel));
  });
  registerHTTP(
    "post",
    "/channel/delete",
    router,
    async (req, res) => {
      //get the groups of the user who requested
      res.send(await deleteChannel(req.body.channel));
    },
    [requireValidRole(Roles.SUPER)]
  );

  registerHTTP(
    "post",
    "/channel/update",
    router,
    async (req, res) => {
      //get the groups of the user who requested
      res.send(await updateChannel(req.body.channel));
    },
    [requireValidRole(Roles.ADMIN)]
  );

  registerHTTP("post", "/channel/messages", router, async (req, res) => {
    //get the groups of the user who requested
    res.send(await getMessagesForChannel(req.body.channel));
  });

  registerHTTP("post", "/channels", router, async (req, res) => {
    //get the groups of the user who requested
    res.send(await getChannelsForGroup(req.body.group));
  });
};
