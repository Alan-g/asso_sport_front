import {Paiement} from '../Paiement';
import {Adherent} from '../Adherent';
import {InscriptionDTO} from '../InscriptionDTO';
import {Cours} from '../Cours';
import {DatePipe} from '@angular/common';
import {PaiementCommand} from './PaiementCommand';

export class UpdateAdherentCommand {

    idAdherent: number;
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
    date_naissance: string;

    public static init(adherent: Adherent){
        const datepipe = new DatePipe('en-US');
        const command = new UpdateAdherentCommand();
        command.idAdherent = adherent.id;
        command.genre = adherent.genre;
        command.nom = adherent.nom;
        command.prenom = adherent.prenom;
        command.adresse1 = adherent.adresse1;
        command.adresse2 = adherent.adresse2;
        command.adresse3 = adherent.adresse3;
        command.code_postal = adherent.code_postal;
        command.commune = adherent.commune;
        command.telephone = adherent.telephone;
        command.mail = adherent.mail;
        command.date_naissance = datepipe.transform(adherent.date_naissance, 'yyyy-MM-dd');

        return command;
    }
    

}
