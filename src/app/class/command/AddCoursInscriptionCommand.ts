import {Paiement} from '../Paiement';
import {Adherent} from '../Adherent';
import {InscriptionDTO} from '../InscriptionDTO';
import {Cours} from '../Cours';
import {DatePipe} from '@angular/common';
import {PaiementCommand} from './PaiementCommand';

export class AddCoursInscriptionCommand {

    idCours: number[];
    idInscription: number

    constructor(idCours: number[], idInscription: number) {
        this.idCours = idCours;
        this.idInscription = idInscription;
    }
    

}
