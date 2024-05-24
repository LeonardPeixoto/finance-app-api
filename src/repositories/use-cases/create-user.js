import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../postgres/create-user.js'

export class CreateUserUseCase {
    async execute(CreateUserParams) {
        // verificar se o email ja esta em uso

        // gerar id do usuario
        const userId = uuidv4()

        // criptografar senha
        const hashedPassword = await bcrypt.hash(CreateUserParams.password, 8)

        // inserir o usuario no banco de dados
        const user = {
            ...CreateUserParams,
            ID: userId,
            password: hashedPassword,
        }

        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createUser = await postgresCreateUserRepository.execute(user)

        return createUser
    }
}
