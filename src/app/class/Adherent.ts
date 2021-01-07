export class Adherent {
    id: number;
    genre: string;
    nom: string;
    prenom: string;
    adresse1: string;
    adresse2: string;
    adresse3: string;
    code_postal: string;
    commune: string;
    telephone: string;
    mail: string;
    date_naissance: Date;

    constructor(id: number, genre: string, nom: string, prenom: string, adresse1: string, adresse2: string, adresse3: string, code_postal: string, commune: string, telephone: string, mail: string, date_naissance: Date) {
        this.id = id;
        this.genre = genre;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse1 = adresse1;
        this.adresse2 = adresse2;
        this.adresse3 = adresse3;
        this.code_postal = code_postal;
        this.commune = commune;
        this.telephone = telephone;
        this.mail = mail;
        this.date_naissance = date_naissance;
    }
}
