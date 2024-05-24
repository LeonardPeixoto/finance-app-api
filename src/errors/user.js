export class EmailAlreadyInUseError extends Error {
    constructor() {
        super('O email já está em uso'), (this.name = 'EmailAlreadyInUseError')
    }
}
