export class CreateSalleCommand {
    libelle: string;
    capacite: string;

    constructor(libelle: string, capacite: string) {
        this.libelle = libelle;
        this.capacite = capacite;
    }

}
