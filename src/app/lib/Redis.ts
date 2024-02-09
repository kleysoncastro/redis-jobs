import 'dotenv/config'

import Redis from "redis";

class RedisManager {
  client;
  constructor() {
    this.client = Redis.createClient({
      url: process.env.REDIS_URL
    });

    this.client.on("error", (err) => {
      console.error("Erro na conexão Redis:", err);
    });

    this.client.on("end", () => {
      console.log("Conexão Redis encerrada.");
    });

    // Encerre a conexão ao encerrar o processo
    process.on("exit", () => {
      this.close();
    });
  }
  /**
   * Exclui uma chave no Redis e retorna um código indicando o resultado.
   *
   * @param {string} key A chave que será excluída.
   * @returns {Promise<number>} Um código indicando o resultado da exclusão:
   *   - 0: Chave excluída com sucesso.
   *   - 1: Erro ao excluir a chave.
   *   - 2: Chave não encontrada.
   *   - -1: Erro geral.
   */
  async delKey(key: string): Promise<number> {
    try {
      const result = await new Promise<number>((resolve, reject) => {
        this.client.del(key, (err, result) => {
          if (err) {
            console.error("Erro ao excluir chave:", err);
            reject(1);
          } else {
            if (result === 1) {
              console.log(`Chave "${key}" excluída com sucesso.`);
              resolve(0);
            } else {
              console.log(`Chave "${key}" não encontrada.`);
              resolve(2);
            }
          }
        });
      });

      return result;
    } catch (error) {
      console.error("Erro ao executar delKey:", error);
      return -1; // Ou qualquer valor que indique erro
    }
  }

  async openConnection() {
    if (this.client && !this.client.connected) {
      console.log("Abrindo conexão Redis...");
      await new Promise((resolve) => {
        this.client.once("ready", () => {
          console.log("Conexão Redis aberta.");
          // resolve();
        });
      });
    } else {
      console.log("Conexão Redis já está aberta.");
    }
  }

  close() {
    this.client.quit();
    console.log("Conexão Redis fechada.");
  }
}

const clientRedis = new RedisManager();

export default clientRedis;
