export class CreateProfCommand {
    nom: string;
    prenom: string;
    telephone: string;
    mail: string;

    constructor(nom: string, prenom: string, telephone: string, mail: string) {
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.mail = mail;
    }


}
