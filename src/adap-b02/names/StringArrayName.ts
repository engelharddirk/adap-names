import { type Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {
	protected components: string[] = [];
	protected delimiter: string = DEFAULT_DELIMITER;

	constructor(other: string[], delimiter?: string) {
		this.components = other;
		this.delimiter = delimiter ?? DEFAULT_DELIMITER;
		/* 		for (const str in other) {
			if (str.includes(this.delimiter)) {
				str.replace(this.delimiter, this.ESCAPE_CHARACTER + delimiter);
			}
		} */
	}
	asString(delimiter?: string): string {
		let str = "";
		for (let j = 0; j < this.components.length - 1; j++) {
			str = str + this.components[j] + (delimiter ?? this.delimiter);
		}
		str = str + this.components[this.components.length - 1];
		return str;
	}

	public clone(): Name {
		return new StringArrayName(this.components, this.delimiter);
	}

	asDataString(): string {
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

	isEmpty(): boolean {
		return this.components.length === 0;
	}

	getDelimiterCharacter(): string {
		return this.delimiter;
	}

	/** @methodtype get-method */
	public getComponent(i: number): string {
		return this.components[i];
	}

	/** @methodtype set-method */
	public setComponent(i: number, c: string): void {
		this.components[i] = c;
	}

	/** Returns number of components in Name instance */
	/** @methodtype get-method */
	public getNoComponents(): number {
		return this.components.length;
	}

	/** @methodtype command-method */
	public insert(i: number, c: string): void {
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

	/** @methodtype command-method */
	public append(c: string): void {
		this.components.push(c);
	}

	/** @methodtype command-method */
	public remove(i: number): void {
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
