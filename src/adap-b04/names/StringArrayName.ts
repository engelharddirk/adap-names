import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];
    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other;
    }

    concat(other: Name): void {
        if(other instanceof StringArrayName){
			for(let component of other.components){
                this.components.push(component);
			}
        }
        if(other instanceof StringName){
            let components = this.escapedSplit(other.asDataString());
            for(let component of components){
                this.components.push(component);
			}
		}
    }

    public asDataString(): string {
        let str = "";
		for (let j = 0; j < this.components.length - 1; j++) {
			const escapedComponent = this.components[j].replace(
				this.delimiter,
				ESCAPE_CHARACTER + this.delimiter,
			);
			str = str + escapedComponent + this.delimiter;
		}
		str = str + this.components[this.components.length - 1];
		return str;
    }

    public asString(delimiter?: string): string {
        let str = "";
		for (let j = 0; j < this.components.length - 1; j++) {
			str = str + this.components[j] + (delimiter ?? this.delimiter);
		}
		str = str + this.components[this.components.length - 1];
		return str;
    }
    toString(): string {
        return this.asString();
    }
    clone(): StringArrayName {
        return new StringArrayName(this.components, this.delimiter);
    }


    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        return this.components[i];
    }
    public setComponent(i: number, c: string) {
        if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be ull.");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        if (i < 0 || i > this.components.length) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null.");
        }
        const newComponents: string[] = [];
		for (let j = 0; j < i; j++) {
			newComponents[j] = this.components[j];
		}
		newComponents[i] = c;
		for (let j = i + 1; j < this.components.length + 1; j++) {
			newComponents[j] = this.components[j - 1];
		}
		this.components = newComponents;
        if (this.components.length !== newComponents.length) {
            throw new MethodFailureException("Insertion failed, noComponents does not match.");
        }
    }
    public append(c: string) {
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }
        const initialLength = this.components.length;
        this.components.push(c);
        if (this.components.length !== initialLength + 1) {
            throw new MethodFailureException("Append failed, noComponents does not match.");
        }
    }
    public remove(i: number) {
        if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        const newComponents: string[] = [];
        for (let j = 0; j < i; j++) {
            newComponents[j] = this.components[j];
        }
        for (let j = i + 1; j < this.components.length; j++) {
            newComponents[j - 1] = this.components[j];
        }
        this.components = newComponents;
        if (this.components.length !== newComponents.length) {
            throw new MethodFailureException("Removal failed, noComponents does not match.");
        }
    }
}