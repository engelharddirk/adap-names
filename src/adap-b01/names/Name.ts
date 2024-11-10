export class Name {
	public readonly DEFAULT_DELIMITER: string = ".";
	private readonly ESCAPE_CHARACTER = "\\";

	private components: string[] = [];
	private delimiter: string = this.DEFAULT_DELIMITER;

	constructor(other: string[], delimiter?: string) {
		this.components = other;
		this.delimiter = delimiter ?? this.DEFAULT_DELIMITER;
/* 		for (const str in other) {
			if (str.includes(this.delimiter)) {
				str.replace(this.delimiter, this.ESCAPE_CHARACTER + delimiter);
			}
		} */
	}

	/** Returns human-readable representation of Name instance */
	/** @methodtype conversion-method */
	public asNameString(delimiter: string = this.delimiter): string {
		let str = "";
		for (let j = 0; j < this.components.length - 1; j++) {
            const escapedComponent = this.components[j].replace(this.delimiter, this.ESCAPE_CHARACTER + delimiter);
			str = str + escapedComponent + delimiter;
		}
		str = str + this.components[this.components.length - 1];
		return str;
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
