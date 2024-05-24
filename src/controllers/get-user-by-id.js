import validator from 'validator'
import { GetUserByIdUseCase } from '../repositories/use-cases/get-user-by-id.js'
import { badRequest, okRequest, serverError } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isIdValid) {
                return badRequest({
                    message: 'Invalid user id',
                })
            }
            const getUserByIdUseCase = new GetUserByIdUseCase()
            const user = await getUserByIdUseCase.execute(httpRequest.params.userId)
            return okRequest(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
