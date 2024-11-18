import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
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

    public asDataString(): string {
        return JSON.stringify(this);
    }

    public isEqual(other: Name): boolean {
        return other.getHashCode() === this.getHashCode();
    }

    public getHashCode(): number {
        throw new Error("needs implementation");
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

    public concat(other: Name): void {
        throw new Error("needs implementation");
    }

}