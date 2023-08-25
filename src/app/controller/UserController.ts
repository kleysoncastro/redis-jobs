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

    await Mail.sendMail({
      from: "kleyson queue <castro@castro.com>",
      to: "teste@test.com",
      subject: "teste de fila",
      html: "esse é o corpo de email",
    });

    return res.json(user);
  },
};
