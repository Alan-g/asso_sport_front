export class CreateMontantCommand {
    nombre: number;
    montant: number;

    constructor(nombre: number, montant: number) {
        this.nombre = nombre;
        this.montant = montant;
    }
}
