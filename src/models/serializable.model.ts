/**
 * Internal class used to serialize data to include in the link
 *
 * @export
 * @class Serializable
 */
export class Serializable {

    /**
     * internal dictionary used to hold the keys and values to serialize
     *
     * @private
     * @type {Dictionary}
     */
    private dictionary: Dictionary;

    /**
     * Creates an instance of Serializable.
     */
    constructor() {
        this.dictionary = {};
    }

    /**
     * Add a value to the dictionary of values to serialize
     *
     * @param {string} key the key to add
     * @param {*} value the value to add
     */
    public addValue(key: string, value: any) {
        this.dictionary[key] = value;
    }

    /**
     * serializes the dictionary into key/value pairs based on the delimeter type
     *
     * @param {DelimiterType} delimType indicates if it should serialize the data on the object level or the link level
     * @returns the serialized string that can be used in the final link
     */
    public serialize(delimType: DelimiterType) {

        // Determine delim strings
        let valueDelim: string = delimType === DelimiterType.Object ? ':' : '=';
        let pairDelim: string = delimType === DelimiterType.Object ? ';' : '&';

        let result: string = '';

        // put serialized result together
        for (let key in this.dictionary) {

            if (result.length > 0) {
                result += pairDelim;
            }

            result += key + valueDelim + this.dictionary[key];
        }

        return result;
    }
}

/**
 * An enum to identify what type of delimeters to use when serializing link data
 *
 * @export
 * @enum {number}
 */
export enum DelimiterType {
    /**
     * & and =
     */
    Link,

    /**
     * ; and :
     */
    Object
}

/**
 * A simple dictionary structure
 *
 * @class Dictionary
 */
class Dictionary {
    [key: string]: any;
}