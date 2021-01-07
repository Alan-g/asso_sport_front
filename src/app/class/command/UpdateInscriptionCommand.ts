import {Paiement} from '../Paiement';
import {Adherent} from '../Adherent';
import {InscriptionDTO} from '../InscriptionDTO';
import {Cours} from '../Cours';
import {DatePipe} from '@angular/common';
import {PaiementCommand} from './PaiementCommand';

export class UpdateInscriptionCommand {

    idAdherent: number;
    idInscription: number;
    annee: number;
    certificat: boolean;
    enveloppe: boolean;
    reglement: boolean;
    comite_entreprise: boolean;
    autorisation_parental: boolean;
    commentaire: string;
    montant: number;
    questionnaire_sante: string;
    date_envoi_ce: string;
    reglement_interieur: boolean;
    essai: boolean;
    cart_mra: boolean;

    public static init(idAdherent: number, inscription: InscriptionDTO){
        const datepipe = new DatePipe('en-US');
        const command = new UpdateInscriptionCommand();
        command.idAdherent = idAdherent;
        command.idInscription = inscription.id;
        command.annee = inscription.annee;
        command.certificat = inscription.certificat;
        command.enveloppe = inscription.enveloppe;
        command.reglement = inscription.reglement;
        command.comite_entreprise = inscription.comite_entreprise;
        command.autorisation_parental = inscription.autorisation_parental;
        command.commentaire = inscription.commentaire;
        command.montant = inscription.montant;
        command.questionnaire_sante = inscription.questionnaire_sante;
        command.date_envoi_ce = datepipe.transform(inscription.date_envoi_ce, 'yyyy-MM-dd');
        command.reglement_interieur = inscription.reglement_interieur;
        command.essai = inscription.essai;
        command.cart_mra = inscription.cart_mra;

        return command;
    }
    

}
