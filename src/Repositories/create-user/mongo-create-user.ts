import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/create-user/protocals";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUser implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    // Criando Usuario
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    // Buscando o usuário para vê se realmente foi criado
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("user not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
