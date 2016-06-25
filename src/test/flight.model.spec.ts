import { expect } from 'chai';
import { Flight } from '../models/flight.model';

describe('Flight', function() {
    it('should serialize the entire flight in object form', function() {
        let obj: Flight = new Flight('2016-06-24', 1234, 'DL', 'PNS', 'ATL');
        let sut: string = obj.serialize();

        expect(sut).to.equal('d:2016-06-24;n:1234;ac:DL;da:PNS;aa:ATL');
    });

    it('should serialize only flight date when it is the only thing', function() {
        let obj: Flight = new Flight('2016-06-24', undefined, undefined, undefined, undefined);
        let sut: string = obj.serialize();

        expect(sut).to.equal('d:2016-06-24');
    });

    it('should serialize only flight number when it is the only thing', function() {
        let obj: Flight = new Flight(undefined, 1234, undefined, undefined, undefined);
        let sut: string = obj.serialize();

        expect(sut).to.equal('n:1234');
    });

    it('should serialize only airline code when it is the only thing', function() {
        let obj: Flight = new Flight(undefined, undefined, 'DL', undefined, undefined);
        let sut: string = obj.serialize();

        expect(sut).to.equal('ac:DL');
    });

    it('should serialize only departure airport when it is the only thing', function() {
        let obj: Flight = new Flight(undefined, undefined, undefined, 'PNS', undefined);
        let sut: string = obj.serialize();

        expect(sut).to.equal('da:PNS');
    });

    it('should serialize only arrival airport when it is the only thing', function() {
        let obj: Flight = new Flight(undefined, undefined, undefined, undefined, 'ATL');
        let sut: string = obj.serialize();

        expect(sut).to.equal('aa:ATL');
    });
});