export class CreateUserCommand {
    idRole: number;
    username: string;
    password: string;

    constructor(idRole: number, username: string, password: string) {
        this.idRole = idRole;
        this.username = username;
        this.password = password;
    }
}
