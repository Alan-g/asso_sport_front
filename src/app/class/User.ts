import {Role} from './Role';

export class User {
    id: number;
    role: Role;
    username: string;
    password: string;

    constructor(id: number, role: Role, username: string, password: string) {
        this.id = id;
        this.role = role;
        this.username = username;
        this.password = password;
    }

}
