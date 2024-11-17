import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

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