export class CreateCoursCommand {
    typeCoursId: number;
    idSalle: number;
    profId: number;
    jour: string;
    heureDebut: string;
    heurefin: string;
    limite: number;

    constructor(typeCoursId: number, idSalle: number, profId: number, jour: string, heureDebut: string, heurefin: string, limite: number) {
        this.typeCoursId = typeCoursId;
        this.profId = profId;
        this.jour = jour;
        this.heureDebut = heureDebut;
        this.heurefin = heurefin;
        this.limite = limite;
        this.idSalle = idSalle;
    }

}
