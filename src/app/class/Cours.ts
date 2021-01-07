import {TypeCours} from './TypeCours';
import {Prof} from './Prof';
import {Salle} from './Salle';

export class Cours {
    id: number;
    typeCours: TypeCours;
    salle: Salle;
    jour: string;
    heure_debut: string;
    heure_fin: string;
    prof: Prof;
    limite: number;
    effectif: number;
    idLink: number;

}
