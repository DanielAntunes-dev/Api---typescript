import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Daniel",
        lastName: "Antunes",
        email: "daniel@email.com",
        password: "123456",
      },
    ];
  }
}


// export class PostgresGetUsersRepository implements IGetUsersRepository {
//   async getUsers(): Promise<User[]> {
//     return [
//       {
//         firstName: "Daniel",
//         lastName: "Antunes",
//         email: "daniel@email.com",
//         password: "123456",
//       },
//     ];
//   }
// }