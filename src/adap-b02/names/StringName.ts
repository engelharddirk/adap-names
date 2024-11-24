import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import type { Name } from "./Name";
import { StringArrayName } from "./StringArrayName";

export class StringName implements Name {
	protected delimiter: string = DEFAULT_DELIMITER;

	protected name: string = "";
	protected length: number = 0;

	constructor(other: string, delimiter?: string) {
		this.name = other;
		this.delimiter = delimiter ?? DEFAULT_DELIMITER;
		this.length = other.split(this.delimiter).length;
	}

	private arrToStr(arr: string[]) {
		let str = "";
		for (let j = 0; j < arr.length - 1; j++) {
			str = str + arr[j] + (this.delimiter ?? DEFAULT_DELIMITER);
		}
		str = str + arr[arr.length - 1];
		return str;
	}

	private escapedSplit(string: string): string[] {
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

	public asString(delimiter: string = this.delimiter): string {
		return this.name.replace(ESCAPE_CHARACTER, "");
	}

	public asDataString(): string {
		throw this.name;
	}

	public isEmpty(): boolean {
		return this.length === 0;
	}

	public getDelimiterCharacter(): string {
		return this.delimiter;
	}

	public getNoComponents(): number {
		return this.length;
	}

	public getComponent(x: number): string {
		return this.escapedSplit(this.name)[x];
	}

	public setComponent(n: number, c: string): void {
		const arr = this.escapedSplit(this.name);
		arr[n] = c;
		this.name = this.arrToStr(arr);
	}

	public insert(n: number, c: string): void {
		const components = this.escapedSplit(this.name);
		const newComponents: string[] = [];
		for (let j = 0; j < n; j++) {
			newComponents[j] = components[j];
		}
		newComponents[n] = c;
		for (let j = n + 1; j < components.length + 1; j++) {
			newComponents[j] = components[j - 1];
		}
		this.name = this.arrToStr(newComponents);
		this.length++;
	}

	public append(c: string): void {
		const arr = this.escapedSplit(this.name);
		arr.push(c);
		this.name = this.arrToStr(arr);
		this.length++;
	}

	public remove(n: number): void {
		const arr = this.escapedSplit(this.name);
		const newComponents: string[] = [];
		for (let j = 0; j < n; j++) {
			newComponents[j] = arr[j];
		}
		for (let j = n + 1; j < arr.length; j++) {
			newComponents[j - 1] = arr[j];
		}
		this.length--;
		this.name = this.arrToStr(newComponents);
	}

	public concat(other: Name): void {
		this.name = `${this.name}${other}`;
	}
}
