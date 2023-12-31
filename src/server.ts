import express from "express";
import UserController from "./app/controller/UserController";

const app = express();
app.use(express.json());

app.post("/users", UserController.store);

app.listen(3333, () => {
  console.log("run server app");
});
