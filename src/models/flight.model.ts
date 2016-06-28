import { Serializable, DelimiterType } from './serializable.model';

/**
 * The flight object holds all information about the flights to insure.
 *
 * @export
 * @class Flight
 */
export class Flight {

    /**
     * the date of the flight's departure in ISO 8601 format
     *
     * @type {string}
     */
    public departureDate: string;

    /**
     * The number of the flight
     *
     * @type {number}
     */
    public flightNumber: number;

    /**
     * The IATA code of the airline that is servicing the flight (Example: Delta Air Lines Inc. = DL).
     *
     * @type {string}
     */
    public airlineCode: string;

    /**
     * The IATA code of the airport the flight departs from (Example: O'Hare International Airport = ORD).
     *
     * @type {string}
     */
    public departureAirportCode: string;

    /**
     * The IATA code of the airport the flight arrives at (Example: O'Hare International Airport = ORD).
     *
     * @type {string}
     */
    public arrivalAirportCode: string;


    /**
     * Creates an instance of Flight.
     *
     * @param {string} [departureDate] the date of the flight's departure in ISO 8601 format.
     * @param {number} [flightNumber] The number of the flight
     * @param {string} [airlineCode] The IATA code of the airline that is servicing the flight (Example: Delta Air Lines Inc. = DL).
     * @param {string} [departureAirportCode] The IATA code of the airport the flight departs from (Example: O'Hare International Airport = ORD).
     * @param {string} [arrivalAirportCode] The IATA code of the airport the flight arrives at (Example: O'Hare International Airport = ORD).
     */
    constructor(departureDate?: string, flightNumber?: number, airlineCode?: string, departureAirportCode?: string, arrivalAirportCode?: string) {
        this.departureDate = departureDate;
        this.flightNumber = flightNumber;
        this.airlineCode = airlineCode;
        this.departureAirportCode = departureAirportCode;
        this.arrivalAirportCode = arrivalAirportCode;
    }

    /**
     * Creates a string represtening the flight that can be used in the final link
     *
     * @returns {string} a link usable string
     */
    public serialize(): string {

        let s: Serializable = new Serializable();

        if (this.departureDate) {
            s.addValue('d', this.departureDate);
        }

        if (this.flightNumber) {
            s.addValue('n', this.flightNumber);
        }

        if (this.airlineCode) {
            s.addValue('ac', this.airlineCode);
        }

        if (this.departureAirportCode) {
            s.addValue('da', this.departureAirportCode);
        }

        if (this.arrivalAirportCode) {
            s.addValue('aa', this.arrivalAirportCode);
        }

        return s.serialize(DelimiterType.Object);
    }
}