import { Serializable, DelimiterType } from './serializable.model';

export class Trip {
    public destinationCountryIsoCode2: string;
    public residenceStateIsoCode2: string;
    public departureDate: string;
    public returnDate: string;
    public initialPaymentDate: string;
    public policyholderEmail: string;
    public totalTravelerCount: number;

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