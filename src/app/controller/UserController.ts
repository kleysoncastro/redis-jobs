import { Request, Response } from "express";
import Mail from "../lib/mail";
export default {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password,
    };

    return res.json(user);
  },
};
