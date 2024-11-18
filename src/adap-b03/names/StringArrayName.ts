import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { StringName } from "./StringName";

export class StringArrayName extends AbstractName {
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

    asString(delimiter?: string): string {
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

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other;
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        return this.components[i];
    }
    setComponent(i: number, c: string) {
        this.components[i] = c;
    }

    insert(i: number, c: string) {
        const newComponents: string[] = [];
		for (let j = 0; j < i; j++) {
			newComponents[j] = this.components[j];
		}
		newComponents[i] = c;
		for (let j = i + 1; j < this.components.length + 1; j++) {
			newComponents[j] = this.components[j - 1];
		}
		this.components = newComponents;
    }
    append(c: string) {
        this.components.push(c);
    }
    remove(i: number) {
        const newComponents: string[] = [];
		for (let j = 0; j < i; j++) {
			newComponents[j] = this.components[j];
		}
		for (let j = i + 1; j < this.components.length; j++) {
			newComponents[j - 1] = this.components[j];
		}
		this.components = newComponents;
    }
}