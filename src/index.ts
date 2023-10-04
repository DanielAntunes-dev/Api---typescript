import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository, PostgresGetUsersRepository } from './Repositories/get-users/mongo-get-users';

config();

const app = express();

const port = process.env.PORT || 8000;

// MONGODB
app.get("/users",async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository()
  const getUsersController = new GetUsersController(mongoGetUsersRepository)

  const {body, statusCode} = await getUsersController.handle()

  res.send(body).status(statusCode)
});

// POSTGRES
app.get("/users", async (req, res) => {
  const postgresGetUsersRepository = new PostgresGetUsersRepository();
  const getUsersController = new GetUsersController(postgresGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.send(body).status(statusCode);
});


app.listen(port, () => console.log(`Linstening on port ${port}!`));
