import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/create-user/protocals";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    // Criando Usuario
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    // Buscando o usuário para vê se realmente foi criado
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    // Se ele não for criado, um error
    if (!user) {
      throw new Error("user not created");
    }

    // substitui o _id criado automaticamente pelo mongo, pelo id na nossa model
    const { _id, ...rest } = user;

    // Se for criado retornaremos isso
    return { id: _id.toHexString(), ...rest };
  }
}
