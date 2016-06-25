import { Serializable, DelimiterType } from './serializable.model';

export class Traveler {
    public age: number;
    public birthdate: string;
    public tripCost: number;

    constructor(tripCost?: number) {
        this.tripCost = tripCost;
    }

    public serialize(): string {

        let s: Serializable = new Serializable();

        if (this.birthdate) {
            s.addValue('db', this.birthdate);
        }
        else if (this.age) {
            s.addValue('a', this.age);
        }

        if (this.tripCost && this.tripCost >= 0) {
            s.addValue('tc', this.tripCost);
        }

        return s.serialize(DelimiterType.Object);
    }
}