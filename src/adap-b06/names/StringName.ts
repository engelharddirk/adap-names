import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { StringArrayName } from "./StringArrayName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../../adap-b05/common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;
    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.noComponents = other.split(this.delimiter).length;
    }

    private arrToStr(arr: string[]) {
        let str = "";
        for (let j = 0; j < arr.length - 1; j++) {
            str = str + arr[j] + (this.delimiter ?? DEFAULT_DELIMITER);
        }
        str = str + arr[arr.length - 1];
        return str;
    }

    public concat(other: Name): StringName {
        if (!other) {
            throw new IllegalArgumentException("Other string cannot be empty or null");
        }
        let newName = this.name;
        if (other instanceof StringArrayName) {
            let components = this.escapedSplit(other.asDataString());
            for (let component of components) {
                newName += (this.delimiter ?? DEFAULT_DELIMITER) + component;
            }
        }
        if (other instanceof StringName) {
            let components = this.escapedSplit(other.asDataString());
            for (let component of components) {
                newName += (this.delimiter ?? DEFAULT_DELIMITER) + component;
            }
        }
        if (!newName) {
            throw new MethodFailedException("Concatenation failed, resulting name cannot be empty or null");
        }
        return new StringName(newName, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        let str = this.name.replace(ESCAPE_CHARACTER, "");
        if (delimiter) {
            str = str.replace(this.delimiter, delimiter);
        }
        if (!str) {
            throw new MethodFailedException("Resulting string cannot be empty or null.");
        }
        return str;
    }

    public clone(): StringName {
        const clone = new StringName(this.name, this.delimiter);
        if (!clone) {
            throw new MethodFailedException("Cloning failed, resulting clone cannot be null");
        }
        return clone;
    }

    public asDataString(): string {
        if (!this.name) {
            throw new MethodFailedException("Name was empty or null");
        }
        return this.name;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        return this.escapedSplit(this.name)[x];
    }

    public setComponent(n: number, c: string): StringName {
        if (n < 0 || n > this.noComponents) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        const arr = this.escapedSplit(this.name);
        arr[n] = c;
        const newName = this.arrToStr(arr);
        return new StringName(newName, this.delimiter);
    }

    public insert(n: number, c: string): StringName {
        if (n < 0 || n > this.noComponents) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }
        const components = this.escapedSplit(this.name);
        const newComponents: string[] = [];
        for (let j = 0; j < n; j++) {
            newComponents[j] = components[j];
        }
        newComponents[n] = c;
        for (let j = n + 1; j < components.length + 1; j++) {
            newComponents[j] = components[j - 1];
        }
        const newName = this.arrToStr(newComponents);
        const newNoComponents = this.noComponents + 1;
        if (newNoComponents !== newComponents.length) {
            throw new MethodFailedException("Insertion failed, noComponents does not match");
        }
        return new StringName(newName, this.delimiter);
    }

    public append(c: string): StringName {
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null.");
        }
        const arr = this.escapedSplit(this.name);
        arr.push(c);
        const newName = this.arrToStr(arr);
        const newNoComponents = this.noComponents + 1;
        if (newNoComponents !== arr.length) {
            throw new MethodFailedException("Append failed, noComponents does not match");
        }
        return new StringName(newName, this.delimiter);
    }

    public remove(n: number): StringName {
        if (n < 0 || n >= this.noComponents) {
            throw new IllegalArgumentException("Index out of bounds.");
        }
        const arr = this.escapedSplit(this.name);
        const newComponents: string[] = [];
        for (let j = 0; j < n; j++) {
            newComponents[j] = arr[j];
        }
        for (let j = n + 1; j < arr.length; j++) {
            newComponents[j - 1] = arr[j];
        }
        const newName = this.arrToStr(newComponents);
        const newNoComponents = this.noComponents - 1;
        if (newNoComponents !== newComponents.length) {
            throw new MethodFailedException("Removal failed, noComponents does not match");
        }
        return new StringName(newName, this.delimiter);
    }
}