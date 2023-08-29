import { Request, Response } from "express";

import clientRedis from "../lib/Redis";
import Queue from "../lib/Queue";
export default {
  async store(req: Request, res: Response) {
    const { name, email, password, key } = req.body;
    clientRedis.openConnection();

    const user = {
      name,
      email,
      password,
      comando: "/set",
      flag: false,
    };

    clientRedis.client.set(String(key), JSON.stringify(user), (err, reply) => {
      if (err) {
        console.error("Erro ao salvar no Redis:", err);
      } else {
        console.log("JSON salvo no Redis:", reply);
      }

      // Feche a conexão com o Redis
      //client.quit();
    });

    await Queue.add({ user });
    // await Queue.add(user, { repeat: { cron: "1 * * * 1" } });
    return res.json(user);
  },
};
