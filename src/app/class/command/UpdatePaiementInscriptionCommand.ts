import {Paiement} from '../Paiement';
import {DatePipe} from '@angular/common';

export class UpdatePaiementInscriptionCommand {

    paiements: Paiement[];
    idInscription: number;
    annee: number;
    datepipe = new DatePipe('en-US');

    constructor(paiements: Paiement[], idInscription: number, annee: number) {
        paiements.forEach(paiement => {
            // @ts-ignore
            paiement.dateEncaissement = (this.datepipe.transform(paiement.dateEncaissement, 'yyyy-MM-dd') as Date);
        });
        this.paiements = paiements;
        this.idInscription = idInscription;
        this.annee = annee;
    }


}
