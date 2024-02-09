import Mail from "../lib/mail";
import clientRedis from "../lib/Redis";

export default {
  key: "RegistrationMail",
  async handle({ data }: any) {
    const { user } = data;
    for (let i = 0; i < 3; i++) {
      await new Promise((resolve) => setTimeout(resolve, i + 1 * 5000));

      const flag = await new Promise((resolve, reject) => {
        clientRedis.client.get(user.name, (err, reply) => {
          if (err) {
            console.error("Erro ao recuperar do Redis:", err);
            reject(err);
          } else {
            const retrievedJson = JSON.parse(reply);
            if (retrievedJson) {

              console.log("-------------redis-------", retrievedJson);
              resolve(retrievedJson.flag);
            }
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
        await clientRedis.delKey(user.name);
        break; // Para a tentativa se o email for enviado
      }

      if (i === 2 && !flag) {
        await Mail.sendMail({
          from: `${user.name} queue <castro@castro.com>`,
          to: user.email,
          subject: "Bridge off-line",
          html: "esse é o corpo de email",
        });
        await clientRedis.delKey(user.name);

        console.log("Email enviado (Bridge off-line)");
      }

      console.log("[hanlde] ----- retentativa ");

    }
  },
};
