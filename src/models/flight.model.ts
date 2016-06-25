import { Serializable, DelimiterType } from './serializable.model';

export class Flight {

    public departureDate: string;
    public flightNumber: number;
    public airlineCode: string;
    public departureAirportCode: string;
    public arrivalAirportCode: string;

    constructor(departureDate?: string, flightNumber?: number, airlineCode?: string, departureAirportCode?: string, arrivalAirportCode?: string) {
        this.departureDate = departureDate;
        this.flightNumber = flightNumber;
        this.airlineCode = airlineCode;
        this.departureAirportCode = departureAirportCode;
        this.arrivalAirportCode = arrivalAirportCode;
    }

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