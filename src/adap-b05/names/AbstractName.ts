import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
    }

    escapedSplit(string: string): string[] {
		const ret: string[] = [];
		let skip = false;
		let component = "";
		for (let i = 0; i < string.length; i++) {
			switch (string[i]) {
				case ESCAPE_CHARACTER: {
					skip = true;
					break;
				}
				case this.delimiter: {
					if (skip === true) {
						skip = false;
						break;
					}
					ret.push(component);
					component = "";
					break;
				}
				default: {
					component = `${component}${string[i]}`;
				}
			}
		}
		ret.push(component);
		return ret;
	}

    simpleHash(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash;
}

    abstract asString(): string;

    public toString(): string{
        return this.asString();
    };

    /* Abstract implementation just uses generic JSON stringify, should be overridden */
    public asDataString(): string {
        return JSON.stringify(this);
    }

    public isEqual(other: Name): boolean {
        if (other === null) {
            throw new IllegalArgumentException("Other name cannot be null");
        }
        return other.getHashCode() === this.getHashCode();
    }

    public getHashCode(): number {
        const hashCode = this.simpleHash(this.asDataString());
        return hashCode;
    }

    abstract clone(): Name

    public isEmpty(): boolean {
        return this.asDataString().length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    abstract concat(other: Name): void;
}