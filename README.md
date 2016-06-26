# bhtp-url

This package is availbale for use by accounts and partners of Berkshire Hathaway Travel Protection for integrating with the consumer direct website.

## Things to Know
- Any parameters that do not have a value, will not be added to the integration url when using this package
- All dates follow [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) standard
- All countries and states follow [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) standard
- All flight information is identified by [IATA codes](https://en.wikipedia.org/wiki/International_Air_Transport_Association)

# API

## the **Link** object
The link object holds all information about the integration and is the top level object in this package. It contains the following properties:

```javascript
var agentCode;
var campaignId;
var productId;

var enableProdMode;

var trip;
var flights;
var travelers;
var policyholder;

function addFlight(flightObject);
function addTraveler(travelerObject);

function buildLink();
```

This information is used to identify the integration

- **agentCode**: the id of the agent who is referring the user to the site. Used to track commission.
- **campaignId**: an optional id allowing the integrating system to uniquely identify where there the reference is coming from.
- **productId**: if a specific product is requested, it can be specified here.
- **enableProdMode**: when finished testing, set this to true.

This is the insurable information

- **trip**: information about the trip to insure. Description of the model is below.
- **flights**: information about the flights to ensure. Description of the model is below.
- **travelers**: information about the travelers to insure -- this does not include the policyholder. Description of the model is below.
- **policyholder**: information about the traveler holding the policy. Description of the model is below.

#### Generating a useable link

```javascript
    var linkData = new Link(agentCode, campaignId, productId, enableProdMode);

    // Add some trip data
    linkData.trip.destinationCountryIsoCode2 = 'FR';

    // Add flights
    linkData.addFlight(new Flight(departureDate, flightNumber, airlineCode, departureAirport, arrivalAirport));

    // Add travelers
    var traveler = new Traveler(tripCost);
    traveler.age = 25;
    linkData.addTraveler(traveler);

    // Add policyholder information
    linkData.policyholder.birthdate = '1976-07-23';

    // generate the link
    var link = linkData.buildLink();
```

The constructor will create a new link object and it will initialize the flight and traveler arrays, and the trip and policyholder object.

-**

## the **Trip** object
The trip object holds all information about the trip to insure. It contains the following properties:

```javascript
var destinationCountryIsoCode2;
var residenceStateIsoCode2;

var departureDate;
var returnDate;
var initialPaymentDate;

var policyholderEmail;
var totalTravelerCount;
```

- **destinationCountryIsoCode2**: The [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code for the destination country that will be visited. If there is more than one destination country, pass only one.
- **residenceStateIsoCode2**: The [ISO 3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) code for the US state of residence without the US- portion in the beginning (Example: Wisconson = WI).


- **departureDate**: The date of departure in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) format.
- **returneDate**: The date of return from the trip in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) format.
- **initialPaymentDate**: The date the first payment toward the trip was made in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) format.


- **policyholderEmail**: the email of the policyholder
- **totalTravelerCount**: An optional field identifying how many travelers, including the policyholder, that will be on the policy. This may be omitted in lieu of specifying a policyholder and travelers which are documented below.

-**

## the **Traveler** and **Policyholder** objects
The traveler object holds all information about the traveler to insure. It contains the following properties:

```javascript
var birthdate;
var age;
var tripCost;
```

- **birthdate**: the date of birth of the traveler in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) format.
- **age**: The age of the traveler. If the birthdate is specified, this value is ignored.
- **tripCost**: The cost of the trip for this traveler in US dollars.

-**

## the **Flight** object
The flight object holds all information about the flights to insure. This is for AirCare products only. It contains the following properties:

```javascript
var departureDate;
var flightNumber;
var airlineCode;
var departureAirportCode;
var arrivalAirportCode;
```

- **departureDate**: the date of the flight's departure in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) format.
- **flightNumber**: The number of the flight.
- **airlineCode**: The [IATA code](http://www.iata.org/about/members/Pages/airline-list.aspx?All=true) of the airline that is servicing the flight (Example: Delta Air Lines Inc. = DL).
- **departureAirportCode**: The [IATA code](https://www.world-airport-codes.com/) of the airport the flight departs from (Example: O'Hare International Airport = ORD).
- **arrivalAirportCode**: The [IATA code](https://www.world-airport-codes.com/) of the airport the flight arrives at.