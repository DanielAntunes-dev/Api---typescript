import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) { }

    async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>> {
        try {
            const id = httpRequest?.params?.id;
            const body = httpRequest?.body;

            if (!id) {
                return badRequest("Missing user id")
            }

            if (!body) {
                return badRequest("Missing fields")
            }

            const allowedFieldsToUpdade: (keyof UpdateUserParams)[] = [
                "firstName",
                "lastName",
                "password"];

            const someFieldIsNotAllowedToUpdade = Object.keys(body).some(
                (key) => !allowedFieldsToUpdade.includes(key as keyof UpdateUserParams));

            if (someFieldIsNotAllowedToUpdade) {
                return badRequest("Some received fields is not allowed")
            }

            const user = await this.updateUserRepository.updateUser(id, body);

            return ok<User>(user)

        } catch (error) {
            return serverError()
        }
    }
}
