import { expect } from 'chai';
import { Link } from '../models/link.model';
import { Traveler } from '../models/traveler.model';
import { Flight } from '../models/flight.model';

describe('Link', function() {
    it('should only create a non-production link', function() {
        let obj: Link = new Link(undefined, undefined, undefined);
        let sut: string = obj.buildLink();

        expect(sut).to.equal('https://sbx-www.bhtp.com/i');
    });

    it('should only create a production link', function() {
        let obj: Link = new Link(undefined, undefined, undefined, true);
        let sut: string = obj.buildLink();

        expect(sut).to.equal('https://www.bhtp.com/i');
    });

    it('should only add source and medium', function() {
        let obj: Link = new Link('AAgent', undefined, undefined);
        let sut: string = obj.buildLink();

        expect(sut).to.equal('https://sbx-www.bhtp.com/i?utm_source=AAgent&utm_medium=Partner');
    });

    it('should only add campaign', function() {
        let obj: Link = new Link(undefined, 'TestPromo', undefined);
        let sut: string = obj.buildLink();

        expect(sut).to.equal('https://sbx-www.bhtp.com/i?campaign=TestPromo');
    });

    it('should only add package', function() {
        let obj: Link = new Link(undefined, undefined, 'AirCare');
        let sut: string = obj.buildLink();

        expect(sut).to.equal('https://sbx-www.bhtp.com/i?package=AirCare');
    });

    it('should only add trip', function() {
        let obj: Link = new Link(undefined, undefined, undefined);
        obj.trip.destinationCountryIsoCode2 = 'IE';
        let sut: string = obj.buildLink();

        expect(sut).to.equal('https://sbx-www.bhtp.com/i?dc=IE');
    });

    it('should only add policyholder', function() {
        let obj: Link = new Link(undefined, undefined, undefined);
        obj.policyholder.tripCost = 100;
        obj.policyholder.age = 34;

        let sut: string = obj.buildLink();

        expect(sut).to.equal('https://sbx-www.bhtp.com/i?ph=a:34;tc:100');
    });

    it('should only add travelers', function() {
        let obj: Link = new Link(undefined, undefined, undefined);

        let t1: Traveler = new Traveler();
        t1.tripCost = 100;
        t1.age = 28;

        obj.addTraveler(t1);

        let t2: Traveler = new Traveler();
        t2.tripCost = 200;
        t2.age = 88;

        obj.addTraveler(t2);

        let sut: string = obj.buildLink();

        expect(sut).to.equal('https://sbx-www.bhtp.com/i?t=a:28;tc:100&t=a:88;tc:200');
    });

    it('should only add flights', function() {
        let obj: Link = new Link(undefined, undefined, undefined);

        let f1: Flight = new Flight();
        f1.airlineCode = 'DL';
        f1.flightNumber = 1234;

        obj.addFlight(f1);

        let f2: Flight = new Flight();
        f2.airlineCode = 'AA';
        f2.flightNumber = 2665;

        obj.addFlight(f2);

        let sut: string = obj.buildLink();

        expect(sut).to.equal('https://sbx-www.bhtp.com/i?f=n:1234;ac:DL&f=n:2665;ac:AA');
    });

    it('should all play nicely together', function() {
        let obj: Link = new Link('AAgent', 'TestPromo', 'ExactCare');

        // Trip
        obj.trip.destinationCountryIsoCode2 = 'GB';
        obj.trip.residenceStateIsoCode2 = 'WI';
        obj.trip.departureDate = '2016-06-24';
        obj.trip.returnDate = '2016-07-10';
        obj.trip.initialPaymentDate = '2016-06-15';
        obj.trip.policyholderEmail = 'sherlock.holmes@bhtp.com';
        obj.trip.totalTravelerCount = 5;

        // flights
        obj.addFlight(new Flight('2016-06-24', 1234, 'DL', 'PNS', 'ATL'));
        obj.addFlight(new Flight('2016-06-27', 2665, 'AA', 'ATL', 'LAX'));

        obj.policyholder.tripCost = 100;
        obj.policyholder.age = 34;

        // travelers
        let t1: Traveler = new Traveler();
        t1.tripCost = 100;
        t1.age = 28;

        obj.addTraveler(t1);

        let t2: Traveler = new Traveler();
        t2.tripCost = 200;
        t2.birthdate = '1986-09-07';

        obj.addTraveler(t2);

        let sut: string = obj.buildLink();

        let expected: string =
            'https://sbx-www.bhtp.com/i?utm_source=AAgent&utm_medium=Partner&campaign=TestPromo&package=ExactCare' +
            '&dc=GB&rs=WI&dd=2016-06-24&rd=2016-07-10&pd=2016-06-15&e=sherlock.holmes@bhtp.com&tt=5' +
            '&f=d:2016-06-24;n:1234;ac:DL;da:PNS;aa:ATL&f=d:2016-06-27;n:2665;ac:AA;da:ATL;aa:LAX' +
            '&ph=a:34;tc:100&t=a:28;tc:100&t=db:1986-09-07;tc:200';

        expect(sut).to.equal(expected);
    });
});