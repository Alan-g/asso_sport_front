export class ChangePasswordCommand {
    private oldPassword: string;
    private newPassword: string;

    constructor(oldPassword: string, newPassword: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
