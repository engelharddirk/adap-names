import { StringArrayName } from "./StringArrayName";
import { StringName } from "./StringName";

const test: StringName = new StringName("oss.cs.fau.de", ".");
const test1: StringArrayName = new StringArrayName(["oss", "cs", "fau", "de"], ".");
const test2: StringArrayName = new StringArrayName(["oss2", "cs", "fau", "de"], ".");
const test2copy = test2.clone()

const testcopy = test.clone()

console.log(test.asDataString() + " " + test1.asDataString())
console.log(test.getHashCode() + " " + test1.getHashCode())
console.log(test.isEqual(test1))