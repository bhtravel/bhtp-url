import { expect } from 'chai';
import { Trip } from '../models/trip.model';

describe('Trip', function() {
    it('should serialize the entire trip in object form', function() {
        let obj: Trip = new Trip();
        obj.destinationCountryIsoCode2 = 'GB';
        obj.residenceStateIsoCode2 = 'WI';
        obj.departureDate = '2016-06-24';
        obj.returnDate = '2016-07-10';
        obj.initialPaymentDate = '2016-06-15';
        obj.policyholderEmail = 'sherlock.holmes@bhtp.com';
        obj.totalTravelerCount = 5;

        let sut: string = obj.serialize();

        expect(sut).to.equal('dc=GB&rs=WI&dd=2016-06-24&rd=2016-07-10&pd=2016-06-15&e=sherlock.holmes@bhtp.com&tt=5');
    });

    it('should serialize only destination country when it is the only thing', function() {
        let obj: Trip = new Trip();
        obj.destinationCountryIsoCode2 = 'GB';

        let sut: string = obj.serialize();

        expect(sut).to.equal('dc=GB');
    });

    it('should serialize only residence state when it is the only thing', function() {
        let obj: Trip = new Trip();
        obj.residenceStateIsoCode2 = 'WI';

        let sut: string = obj.serialize();

        expect(sut).to.equal('rs=WI');
    });

    it('should serialize only departure date when it is the only thing', function() {
        let obj: Trip = new Trip();
        obj.departureDate = '2016-06-24';

        let sut: string = obj.serialize();

        expect(sut).to.equal('dd=2016-06-24');
    });

    it('should serialize only return date when it is the only thing', function() {
        let obj: Trip = new Trip();
        obj.returnDate = '2016-07-10';

        let sut: string = obj.serialize();

        expect(sut).to.equal('rd=2016-07-10');
    });

    it('should serialize only payment date when it is the only thing', function() {
        let obj: Trip = new Trip();
        obj.initialPaymentDate = '2016-06-15';

        let sut: string = obj.serialize();

        expect(sut).to.equal('pd=2016-06-15');
    });

    it('should serialize only policyholder email when it is the only thing', function() {
        let obj: Trip = new Trip();
        obj.policyholderEmail = 'sherlock.holmes@bhtp.com';

        let sut: string = obj.serialize();

        expect(sut).to.equal('e=sherlock.holmes@bhtp.com');
    });


    it('should serialize only traveler count when it is the only thing', function() {
        let obj: Trip = new Trip();
        obj.totalTravelerCount = 5;

        let sut: string = obj.serialize();

        expect(sut).to.equal('tt=5');
    });
});