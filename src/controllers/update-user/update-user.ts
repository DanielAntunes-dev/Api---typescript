import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) { }

    async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User>> {
        try {
            const id = httpRequest?.params?.id;
            const body = httpRequest?.body;

            if (!id) {
                return {
                    statusCode: 400,
                    body: "Missing user id"
                }
            }

            if (!body) {
                return {
                    statusCode: 400,
                    body: "Missing fields"
                }
            }

            const allowedFieldsToUpdade: (keyof UpdateUserParams)[] = [
                "firstName",
                "lastName",
                "password"];

            const someFieldIsNotAllowedToUpdade = Object.keys(body).some(
                (key) => !allowedFieldsToUpdade.includes(key as keyof UpdateUserParams));

            if (someFieldIsNotAllowedToUpdade) {
                return {
                    statusCode: 400,
                    body: "Some received fields is not allowed",
                };
            }

            const user = await this.updateUserRepository.updateUser(id, body);

            return {
                statusCode: 200,
                body: user,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong"
            };
        }
    }
}
