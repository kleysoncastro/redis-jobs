import Mail from "../lib/mail";
import clientRedis from "../lib/Redis";

export default {
  key: "RegistrationMail",
  async handle({ data }: any) {
    const { user } = data;
    for (let i = 0; i < 3; i++) {
      await new Promise((resolve) => setTimeout(resolve, i * 5000));

      const flag = await new Promise((resolve, reject) => {
        clientRedis.client.get("4455", (err, reply) => {
          if (err) {
            console.error("Erro ao recuperar do Redis:", err);
            reject(err);
          } else {
            const retrievedJson = JSON.parse(reply);
            console.log("JSON recuperado do Redis:", retrievedJson.flag);
            resolve(retrievedJson.flag);
          }
        });
      });

      if (flag) {
        await Mail.sendMail({
          from: `${user.name} queue <castro@castro.com>`,
          to: user.email,
          subject: "Bridge on-line",
          html: "esse é o corpo de email",
        });
        console.log("Email enviado (Bridge on-line)");
        await clientRedis.delKey("4455");
        break; // Para a tentativa se o email for enviado
      }

      if (i === 2 && !flag) {
        await Mail.sendMail({
          from: `${user.name} queue <castro@castro.com>`,
          to: user.email,
          subject: "Bridge off-line",
          html: "esse é o corpo de email",
        });
        await clientRedis.delKey("4455");

        console.log("Email enviado (Bridge off-line)");
      }
    }
  },
};
