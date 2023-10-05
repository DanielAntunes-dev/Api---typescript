import { User } from "../../models/user";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUSersRepository: IGetUsersRepository) { }

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      // validar requisisão
      // direcionar chamada para o Repository
      const users = await this.getUSersRepository.getUsers();

      return ok<User[]>(users)
    } catch (error) {
      return serverError()
    }
  }
}
