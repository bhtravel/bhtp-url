import { Serializable, DelimiterType } from './serializable.model';


/**
 * The trip object holds all information about the trip to insure.
 *
 * @export
 * @class Trip
 */
export class Trip {

    /**
     * The ISO 3166-2 code for the destination country that will be visited.
     * If there is more than one destination country, pass only one.
     *
     * @type {string}
     */
    public destinationCountryIsoCode2: string;

    /**
     * The ISO 3166-2:US code for the US state of residence without the US- portion in the beginning
     * @example
     * // Wisconson = WI
     *
     * @type {string}
     */
    public residenceStateIsoCode2: string;

    /**
     * The date of departure in ISO 8601 format.
     *
     * @type {string}
     */
    public departureDate: string;

    /**
     * The date of return from the trip in ISO 8601 format.
     *
     * @type {string}
     */
    public returnDate: string;

    /**
     * The date the first payment toward the trip was made in ISO 8601 format.
     *
     * @type {string}
     */
    public initialPaymentDate: string;

    /**
     * the email of the policyholder
     *
     * @type {string}
     */
    public policyholderEmail: string;

    /**
     * An optional field identifying how many travelers, including the policyholder, that will be on the policy.
     * This may be omitted in lieu of specifying a policyholder and travelers.
     *
     * @type {number}
     */
    public totalTravelerCount: number;

    /**
     * Creates a string represtening the trip that can be used in the final link.
     *
     * @returns {string} a link usable string
     */
    public serialize(): string {

        let s: Serializable = new Serializable();

        if (this.destinationCountryIsoCode2) {
            s.addValue('dc', this.destinationCountryIsoCode2);
        }

        if (this.residenceStateIsoCode2) {
            s.addValue('rs', this.residenceStateIsoCode2);
        }

        if (this.departureDate) {
            s.addValue('dd', this.departureDate);
        }

        if (this.returnDate) {
            s.addValue('rd', this.returnDate);
        }

        if (this.initialPaymentDate) {
            s.addValue('pd', this.initialPaymentDate);
        }

        if (this.policyholderEmail) {
            s.addValue('e', this.policyholderEmail);
        }

        if (this.totalTravelerCount) {
            s.addValue('tt', this.totalTravelerCount);
        }

        return s.serialize(DelimiterType.Link);
    }
}