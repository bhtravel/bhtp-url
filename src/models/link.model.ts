import { Flight } from './flight.model';
import { Trip } from './trip.model';
import { Traveler } from './traveler.model';
import { Serializable, DelimiterType } from './serializable.model';

/**
 * The link object holds all information about the integration and is the top level object
 *
 * @export
 * @class Link
 */
export class Link  {

    /**
     * indicates whether or not the final created link can be used for production or not
     *
     * @type {boolean}
     */
    public enableProdMode: boolean;

    /**
     * the id of the agent who is referring the user to the site. Used to track commission.
     *
     * @type {string}
     */
    public agentCode: string;

    /**
     * an id allowing the integrating system to uniquely identify where the reference is coming from.
     *
     * @type {string}
     */
    public campaignId: string;

    /**
     * specifies a perferred product. If not supplied, the user will be preseted with the product selection page
     *
     * @type {string}
     */
    public productId: string;

    /**
     * Information about the trip to insure
     *
     * @type {Trip}
     */
    public trip: Trip;

    /**
     * information about the flights to insure
     *
     * @type {Flight[]}
     */
    public flights: Flight[];

    /**
     * information about the travelers to ensure except the traveler that is the policyholder
     *
     * @type {Traveler[]}
     */
    public travelers: Traveler[];

    /**
     * information about the traveler that is the policyholder
     *
     * @type {Traveler}
     */
    public policyholder: Traveler;

    /**
     * Creates an instance of Link.
     *
     * @param {string} agentCode the id of the agent who is referring the user to the site. Used to track commission.
     * @param {string} campaignId an id allowing the integrating system to uniquely identify where the reference is coming from.
     * @param {string} productId if a specific product is requested, it can be specified here.
     * @param {boolean} [enableProdMode=false] indicates whether or not the final created link can be used for production or not
     */
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

    /**
     * Add a flight to the link
     *
     * @param {Flight} flight the filled flight object to add to the link
     */
    public addFlight(flight: Flight): void {
        this.flights.push(flight);
    }

    /**
     * Add a traveler to the link
     *
     * @param {Traveler} traveler the filled traveler object to add to the link
     */
    public addTraveler(traveler: Traveler): void {
        this.travelers.push(traveler);
    }

    /**
     * Given all the information containined within the link and its sub-objects,
     * a link is generated that can be provided to a user.
     *
     * @returns {string} the usable link
     */
    public generateLink(): string {

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