import { Serializable, DelimiterType } from './serializable.model';

/**
 * The traveler object holds all information about the traveler to insure
 *
 * @export
 * @class Traveler
 */
export class Traveler {

    /**
     * The age of the traveler. If the birthdate is specified, this value is ignored.
     *
     * @type {number}
     */
    public age: number;

    /**
     * the date of birth of the traveler in ISO 8601 format.
     *
     * @type {string}
     */
    public birthdate: string;

    /**
     *  The cost of the trip for this traveler in US dollars.
     *
     * @type {number}
     */
    public tripCost: number;


    /**
     * Creates an instance of Traveler.
     *
     * @param {number} [tripCost] The cost of the trip for this traveler in US dollars.
     */
    constructor(tripCost?: number) {
        this.tripCost = tripCost;
    }

    /**
     * Creates a string represtening the traveler that can be used in the final link.
     *
     * @returns {string} a link usable string
     */
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