import Mail from "../lib/mail";

export default {
  key: "RegistrationMail",
  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: `kleyson queue <${user.name}@castro.com>`,
      to: `${user.email}`,
      subject: "teste de fila",
      html: "esse é o corpo de email",
    });
  },
};
