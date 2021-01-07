export class PaiementCommand {
    id: number;
    nom_payeur: string;
    montant: number;
    banque: string;
    dateEncaissement: string;
    numeroCheque: string;

    constructor(id: number, nom_payeur: string, montant: number, banque: string, dateEncaissement: string, numeroCheque: string) {
        this.id = id;
        this.nom_payeur = nom_payeur;
        this.montant = montant;
        this.banque = banque;
        this.dateEncaissement = dateEncaissement;
        this.numeroCheque = numeroCheque;
    }
}
