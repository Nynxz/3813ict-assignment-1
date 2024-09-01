import { Router } from "express";
import { Gateway, GRouter } from "../gateway";
import { registerHTTP } from "../lib/registerHTTP";
import { MongoClient } from "mongodb";
import requireValidRole from "../middleware/requireValidRole";
import { createGroup, findGroups, updateGroup } from "../db/group";
import { Roles } from "../db/user";

export default (router: GRouter, gateway: Gateway) => {
  registerHTTP("get", "/groups", router, async (req, res) => {
    //get the groups of the user who requested
    res.send(await findGroups(gateway.db as MongoClient));
  });

  registerHTTP(
    "post",
    "/groups/create",
    router,
    async (req, res) => {
      //get the groups of the user who requested
      if (req.body.group.groupName == "") {
        return res.status(400).send({ error: "Empty group name" });
      }
      const server = await createGroup(
        gateway.db as MongoClient,
        req.body.group
      );
      res.send(JSON.stringify(server));
    },
    [requireValidRole(Roles.SUPER)]
  );

  registerHTTP(
    "post",
    "/groups/update",
    router,
    async (req, res) => {
      //get the groups of the user who requested
      if (req.body.group.groupName == "") {
        return res.status(400).send({ error: "Empty group name" });
      }
      const server = await updateGroup(
        gateway.db as MongoClient,
        req.body.group
      );
      res.send(JSON.stringify(server));
    },
    [requireValidRole(Roles.SUPER)]
  );
};
