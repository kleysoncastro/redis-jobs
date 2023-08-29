import clientRedis from "./app/lib/Redis";

const data = {
  mac: "3d:44:5a:12:c8",
  comando: "/set",
  flag: true,
};

clientRedis.client.set("4455", JSON.stringify(data), (err, reply) => {
  if (err) {
    console.error("Erro ao salvar no Redis:", err);
  } else {
    console.log("JSON salvo no Redis:", reply);
  }

  // Feche a conexão com o Redis
  //client.quit();
});
