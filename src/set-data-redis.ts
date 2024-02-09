import clientRedis from "./app/lib/Redis";


interface IUser {
  name: string
  email: string;
  password: string
  comando: string;
  flag: boolean;

}


// chave klyson é campo name passado na requisao do express na rota 

clientRedis.client.get("kleyson", (err, reply) => {

  if (err) {
    console.error("Erro ao recuperar do Redis:", err);
  } else {
    const retrievedJson: IUser = JSON.parse(reply);
    if (retrievedJson) {

      clientRedis.client.set("kleyson", JSON.stringify({ flag: true }), (err, reply) => {
        if (err) {
          console.error("Erro ao salvar no Redis:", err);
        } else {
          console.log("JSON salvo no Redis:", reply);
        }

        // Feche a conexão com o Redis
        clientRedis.client.quit();
      });


    }

  }

});



