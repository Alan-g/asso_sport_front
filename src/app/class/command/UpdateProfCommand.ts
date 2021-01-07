export class UpdateProfCommand {
    idProf: number;
    nom: string;
    prenom: string;
    telephone: string;
    mail: string;

    constructor(idProf: number, nom: string, prenom: string, telephone: string, mail: string) {
        this.idProf = idProf;
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.mail = mail;
    }



}
