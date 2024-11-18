import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {
	asString(delimiter: string = this.delimiter): string {
		let str = this.name.replace(ESCAPE_CHARACTER, "");
		if(delimiter){
			str = str.replace(this.delimiter, delimiter);
		}
		return str;
	}

	clone(): StringName {
		return new StringName(this.name, this.delimiter);
	}

	public asDataString(): string {
		return this.name;
	}

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
		super(delimiter);
		this.name = other;
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
    getNoComponents(): number {
       return this.length;
    }

    getComponent(x: number): string {
        return this.escapedSplit(this.name)[x];
    }
    setComponent(n: number, c: string) {
        const arr = this.escapedSplit(this.name);
		arr[n] = c;
		this.name = this.arrToStr(arr);
    }

    insert(n: number, c: string) {
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
    append(c: string) {
        const arr = this.escapedSplit(this.name);
		arr.push(c);
		this.name = this.arrToStr(arr);
		this.length++;
    }
    remove(n: number) {
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

}