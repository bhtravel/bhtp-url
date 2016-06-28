import { expect } from 'chai';
import { Serializable, DelimiterType } from '../models/serializable.model';

describe('Serializable', function() {
    it('should serialize with : and ; when using delimiter of object', function() {
        let s: Serializable = new Serializable();

        s.addValue('one', 1);
        s.addValue('two', 2);

        let sut = s.serialize(DelimiterType.Object);

        expect(sut).to.equal('one:1;two:2');
    });

    it('should not have a ; when only one value', function() {
        let s: Serializable = new Serializable();

        s.addValue('one', 1);

        let sut = s.serialize(DelimiterType.Object);

        expect(sut).to.equal('one:1');
    });

    it('should serialize with = and & when using delimiter of link', function() {
        let s: Serializable = new Serializable();

        s.addValue('one', 1);
        s.addValue('two', 2);

        let sut = s.serialize(DelimiterType.Link);

        expect(sut).to.equal('one=1&two=2');
    });

    it('should not have a & when only one value', function() {
        let s: Serializable = new Serializable();

        s.addValue('one', 1);

        let sut = s.serialize(DelimiterType.Link);

        expect(sut).to.equal('one=1');
    });
});



