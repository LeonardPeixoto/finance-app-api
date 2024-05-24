import { CreateUserUseCase } from '../repositories/use-cases/create-user.js'
import validator from 'validator'
import { badRequest, createdRequest, serverError } from './helpers.js'

export class CreateUserController {
    async execute(httpResquest) {
        try {
            const params = httpResquest.body
            const requireFields = ['first_name', 'last_name', 'email', 'password']

            for (const field of requireFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        message: `O campo ${field} é obrigatório`,
                    })
                }
            }

            const passwordIsValid = params.password.length < 6
            if (passwordIsValid) {
                return badRequest({
                    message: `A senha deve ter no mínimo 6 caracteres`,
                })
            }

            const emailIsvalid = validator.isEmail(params.email)
            if (!emailIsvalid) {
                return badRequest({
                    message: `O email ${params.email} é inválido`,
                })
            }

            const createUserUseCase = new CreateUserUseCase()
            const createdUser = await createUserUseCase.execute(params)
            return createdRequest(createdUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
