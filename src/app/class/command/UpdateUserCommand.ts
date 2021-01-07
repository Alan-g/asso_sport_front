export class UpdateUserCommand {
    idRole: number;
    username: string;

    constructor(idRole: number, username: string) {
        this.idRole = idRole;
        this.username = username;
    }
}
