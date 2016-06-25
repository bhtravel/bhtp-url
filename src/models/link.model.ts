import { Flight } from './flight.model';
import { Trip } from './trip.model';
import { Traveler } from './traveler.model';
import { Serializable, DelimiterType } from './serializable.model';

export class Link  {

    public enableProdMode: boolean;

    public agentCode: string;
    public campaignId: string;
    public productId: string;

    public trip: Trip;
    public flights: Flight[];
    public travelers: Traveler[];
    public policyholder: Traveler;

    constructor(agentCode: string, campaignId: string, productId: string, enableProdMode: boolean = false) {
        this.agentCode = agentCode;
        this.campaignId = campaignId;
        this.productId = productId;

        this.trip = new Trip();
        this.policyholder = new Traveler();
        this.flights = [];
        this.travelers = [];

        this.enableProdMode = enableProdMode;
    }

    public addFlight(flight: Flight): void {
        this.flights.push(flight);
    }

    public addTraveler(traveler: Traveler): void {
        this.travelers.push(traveler);
    }

    public buildLink(): string {

        let link: string = '';

        // Main data
        let s: Serializable = new Serializable();

        if (this.agentCode) {
            s.addValue('utm_source', this.agentCode);
            s.addValue('utm_medium', 'Partner');
        }

        if (this.campaignId) {
            s.addValue('campaign', this.campaignId);
        }

        if (this.productId) {
            s.addValue('package', this.productId);
        }

        link = s.serialize(DelimiterType.Link);

        // Trip
        let tripString: string = this.trip.serialize();

        if (tripString.length > 0 && link.length > 0) {
            link += '&';
        }

        link += tripString;

        // Flights
        if (this.flights && this.flights.length > 0) {
            for (let flight of this.flights) {
                let flightString = '&f=' + flight.serialize();
                link += flightString;
            }
        }

        // Travelers
        if (this.policyholder) {
            let travelerString = this.policyholder.serialize();

            if (travelerString.length > 0) {
                link += '&ph=' + travelerString;
            }
        }

        if (this.travelers && this.travelers.length > 0) {
            for (let traveler of this.travelers) {
                let travelerString = '&t=' + traveler.serialize();
                link += travelerString;
            }
        }

        if (link[0] === '&') {
            link = link.substr(1);
        }

        let env: string = '';

        if (this.enableProdMode !== true) {
            env = 'sbx-';
        }

        let baseLink = `https://${env}www.bhtp.com/i`;

        if (link.length > 0) {
            baseLink += '?'
        }

        let result = baseLink + link;

        return result;
    }
}