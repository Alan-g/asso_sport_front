import {Paiement} from '../Paiement';
import {Adherent} from '../Adherent';
import {InscriptionDTO} from '../InscriptionDTO';
import {Cours} from '../Cours';
import {DatePipe} from '@angular/common';
import {PaiementCommand} from './PaiementCommand';

export class CreateInscriptionCommand {

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

    idCours: number[];

    paiements: PaiementCommand[];
    
    public static init(adherent: Adherent, inscription: InscriptionDTO, cours: Cours[], paiements: Paiement[]){
        const datepipe = new DatePipe('en-US');
        const command = new CreateInscriptionCommand();
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
        command.idCours = [];
        cours.forEach((cour) => {
            command.idCours.push(cour.id);
        });
        command.paiements = [];
        paiements.forEach((paiement) => {
            command.paiements.push(new PaiementCommand(paiement.id, paiement.nom_payeur, paiement.montant, paiement.banque, datepipe.transform(paiement.dateEncaissement, 'yyyy-MM-dd'), paiement.numeroCheque));
        });
        return command;
    }
    

}
