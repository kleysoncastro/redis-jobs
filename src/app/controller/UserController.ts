import { Request, Response } from "express";

import clientRedis from "../lib/Redis";
import Queue from "../lib/Queue";
export default {
  async store(req: Request, res: Response) {
    const { name, email, password, } = req.body;
    clientRedis.openConnection();

    const user = {
      name,
      email,
      password,
      comando: "/set",
      flag: false,
    };

    clientRedis.client.set(String(name), JSON.stringify(user), (err, reply) => {
      if (err) {
        console.error("Erro ao salvar no Redis:", err);
      } else {
        console.log("JSON salvo no Redis:", reply);
      }

      //clientRedis.client.quit();
    });

    await Queue.add({ user });
    // await Queue.add(user, { repeat: { cron: "1 * * * 1" } });
    return res.json(user);
  },
};
