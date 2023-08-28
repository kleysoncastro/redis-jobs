import Mail from "../lib/mail";

export default {
  key: "RegistrationMail",
  async handle({ data }: any) {
    const { user } = data;
    await Mail.sendMail({
      from: `${user.name} queue <castro@castro.com>`,
      to: `${user.email}`,
      subject: "teste de fila",
      html: "esse é o corpo de email",
    });
  },
};
