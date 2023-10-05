import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import {
  CreateUserParams,
  ICreateUserRepository,
} from "./protocals";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) { }

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      // Verificar campos obrigatórios
      const requireFields = ["firstName", "lastName", "email", "password"];

      // validar para cada campo dos que são obrigatório
      for (const field of requireFields) {
        // !httpRequest?.body?. se esse cara não for undefined não dará error
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Fields ${field} is required`)
        }
      }

      // Verificar se o email é valido
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-mail is invalid")
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created<User>(user)

    } catch (error) {
      return serverError()
    }
  }
}
