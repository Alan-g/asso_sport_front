export class UpdateCoursCommand {
    idCours: number;
    typeCoursId: number;
    idSalle: number;
    profId: number;
    jour: string;
    heureDebut: string;
    heurefin: string;
    limite: number;

    constructor(idCours: number, typeCoursId: number, idSalle: number, profId: number, jour: string, heureDebut: string, heurefin: string, limite: number) {
        this.idCours = idCours;
        this.typeCoursId = typeCoursId;
        this.profId = profId;
        this.jour = jour;
        this.heureDebut = heureDebut;
        this.heurefin = heurefin;
        this.limite = limite;
        this.idSalle = idSalle;
    }


}
