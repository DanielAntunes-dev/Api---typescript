import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUSersRepository: IGetUsersRepository) {}

  async handle() {
    try {
      //validar requisisão
      //direcionar chamada para o Repository
      const users = await this.getUSersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}