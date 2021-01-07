export class Annee {
    id: number;
    libelle: string;
    actif: boolean;

    constructor(id: number, libelle: string, actif: boolean) {
        this.id = id;
        this.libelle = libelle;
        this.actif = actif;
    }
}
