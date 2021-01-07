import {Prof} from '../Prof';
import {Cours} from '../Cours';

export class CreateSaisonCommand {
    libelle: string;
    profs: [];
    cours: [];

    constructor(libelle: string, profs: [], cours: []) {
        this.libelle = libelle;
        this.profs = profs;
        this.cours = cours;
    }
}
