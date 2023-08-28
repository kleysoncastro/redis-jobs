import Queue from "bull";
import redisConfig from "../config/Redis";

import ResgistrationMail from "../jobs/ResgistrationMail";

const mailQueue = new Queue(ResgistrationMail.key, { redis: redisConfig });

mailQueue.on("error", () => {
  console.error("Erro na conexão com o Redis:");
});
export default mailQueue;
