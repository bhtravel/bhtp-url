import { expect } from 'chai';
import { Traveler } from '../models/traveler.model';

describe('Traveler', function() {
    it('should serialize the entire traveler in object form', function() {
        let obj: Traveler = new Traveler(1000);
        obj.age = 27;

        let sut: string = obj.serialize();

        expect(sut).to.equal('a:27;tc:1000');
    });

    it('should serialize the entire traveler in object form', function() {
        let obj: Traveler = new Traveler(1000);
        obj.birthdate = '1987-08-25';

        let sut: string = obj.serialize();

        expect(sut).to.equal('db:1987-08-25;tc:1000');
    });

    it('should serialize the birthdate over age', function() {
        let obj: Traveler = new Traveler(1000);
        obj.age = 27;
        obj.birthdate = '1987-08-25';

        let sut: string = obj.serialize();

        expect(sut).to.equal('db:1987-08-25;tc:1000');
    });

    it('should serialize only trip cost when it is the only thing', function() {
        let obj: Traveler = new Traveler(2000);
        let sut: string = obj.serialize();

        expect(sut).to.equal('tc:2000');
    });

    it('should serialize only age when it is the only thing', function() {
        let obj: Traveler = new Traveler(undefined);
        obj.age = 27;

        let sut: string = obj.serialize();

        expect(sut).to.equal('a:27');
    });

    it('should serialize only birthdate when it is the only thing', function() {
        let obj: Traveler = new Traveler(undefined);
        obj.birthdate = '1987-08-25';

        let sut: string = obj.serialize();

        expect(sut).to.equal('db:1987-08-25');
    });
});