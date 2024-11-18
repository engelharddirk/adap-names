import { StringArrayName } from "./StringArrayName";
import { StringName } from "./StringName";

const test: StringName = new StringName("oss.cs.fau.de", ".");
const test2: StringArrayName = new StringArrayName(["oss2", "cs", "fau", "de"], ".");
const test2copy = test2.clone()
console.log(test.asDataString())
console.log(test.concat(test2))
console.log(test)
console.log(test2copy)
const test1copy = test.clone()
console.log(test1copy)