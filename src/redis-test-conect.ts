import 'dotenv/config'
import redis, { RedisClient } from "redis";

// Cria um cliente Redis
const client: RedisClient = redis.createClient({
  url: process.env.REDIS_URL
});

// Lidar com erros de conexão
client.on("error", (error) => {
  console.error("Erro na conexão com o Redis:", error);
});

// Testa a conexão com o Redis
client.ping((error, result) => {
  if (error) {
    console.error("Erro no PING:", error);
  } else {
    console.log("Conexão com o Redis bem-sucedida. Resposta:", result);
  }

  // Fecha o cliente após o teste
  client.quit();
});

