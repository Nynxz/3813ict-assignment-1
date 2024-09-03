import { Router } from "express";
import { Gateway } from "../gateway";
import { registerHTTP } from "../lib/registerHTTP";
import requireValidRole from "../middleware/requireValidRole";
import {
  createGroup,
  findGroups,
  getUsersOfGroup,
  updateGroup,
} from "../db/group";
import { Roles } from "../db/user";

export default (router: Router, gateway: Gateway) => {
  registerHTTP(
    "post",
    "/groups",
    router,
    async (req, res) => {
      //get the groups of the user who requested
      res.send(await findGroups(res.locals.jwt));
    },
    [requireValidRole(Roles.USER)]
  );

  registerHTTP(
    "post",
    "/groups/create",
    router,
    async (req, res) => {
      //get the groups of the user who requested
      if (req.body.group.name == "") {
        return res.status(400).send({ error: "Empty group name" });
      }
      const server = await createGroup(res.locals.jwt._id, req.body.group);
      res.send(JSON.stringify(server));
    },
    [requireValidRole(Roles.ADMIN)]
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
      const server = await updateGroup(req.body.group);
      res.send(JSON.stringify(server));
    },
    [requireValidRole(Roles.SUPER)]
  );

  registerHTTP("post", "/groups/users", router, async (req, res) => {
    //get the groups of the user who requested
    console.log(req.body.group);
    const users = await getUsersOfGroup(req.body.group);
    console.log(users);
    res.send(users);
  });
};
