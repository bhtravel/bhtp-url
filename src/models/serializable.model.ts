export class Serializable {
    private dictionary: Dictionary;

    constructor() {
        this.dictionary = {};
    }

    public addValue(key: string, value: any) {
        this.dictionary[key] = value;
    }

    public serialize(delimType: DelimiterType) {

        let valueDelim: string = delimType === DelimiterType.Object ? ':' : '=';
        let pairDelim: string = delimType === DelimiterType.Object ? ';' : '&';

        let result: string = '';

        for (let key in this.dictionary) {

            if (result.length > 0) {
                result += pairDelim;
            }

            result += key + valueDelim + this.dictionary[key];
        }

        return result;
    }
}

export enum DelimiterType {
    Link,
    Object
}

class Dictionary {
    [key: string]: any;
}