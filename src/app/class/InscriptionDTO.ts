export class InscriptionDTO {
    id: number;
    idAdherent: number;
    annee: number;
    certificat: boolean;
    enveloppe: boolean;
    reglement: boolean;
    comite_entreprise: boolean;
    autorisation_parental: boolean;
    commentaire: string;
    montant: number;
    questionnaire_sante: string;
    date_envoi_ce: Date;
    reglement_interieur: boolean;
    essai: boolean;
    cart_mra: boolean;

    constructor(id: number, idAdherent: number, annee: number, certificat: boolean, enveloppe: boolean, reglement: boolean, comite_entreprise: boolean, autorisation_parental: boolean, commentaire: string, montant: number, questionnaire_sante: string, date_envoi_ce: Date, reglement_interieur: boolean, essai: boolean, cart_mra: boolean) {
        this.id = id;
        this.idAdherent = idAdherent;
        this.annee = annee;
        this.certificat = certificat;
        this.enveloppe = enveloppe;
        this.reglement = reglement;
        this.comite_entreprise = comite_entreprise;
        this.autorisation_parental = autorisation_parental;
        this.commentaire = commentaire;
        this.montant = montant;
        this.questionnaire_sante = questionnaire_sante;
        this.date_envoi_ce = date_envoi_ce;
        this.reglement_interieur = reglement_interieur;
        this.essai = essai;
        this.cart_mra = cart_mra;
    }

}
