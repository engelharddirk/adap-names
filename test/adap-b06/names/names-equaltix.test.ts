import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b06/names/Name";
import { StringName } from "../../../src/adap-b06/names/StringName";
import { StringArrayName } from "../../../src/adap-b06/names/StringArrayName";

describe("Equality test", () => {
  it("test isEqual", () => {
    let strName: Name = new StringName("test");
    let arrName: Name = new StringArrayName(["test"]);
    expect(strName.isEqual(arrName)).toBe(true);
    expect(strName.getHashCode() == arrName.getHashCode()).toBe(true);

    strName = strName.concat(new StringName("test2"));
    arrName = arrName.concat(new StringName("test2"));
    expect(strName.isEqual(arrName)).toBe(true);
    expect(strName.getHashCode() == arrName.getHashCode()).toBe(true); 

    strName = strName.concat(new StringArrayName(["test3"]));
    arrName = arrName.concat(new StringArrayName(["test3"]));
    expect(strName.isEqual(arrName)).toBe(true);
    expect(strName.getHashCode() == arrName.getHashCode()).toBe(true); 

    strName = new StringName("test3,test4", ",");
    arrName = new StringArrayName(["test3", "test4"], ",");
    expect(strName.isEqual(arrName)).toBe(true);
    expect(strName.getHashCode() == arrName.getHashCode()).toBe(true); 
    expect(strName.getNoComponents() == arrName.getNoComponents()).toBe(true);

    strName = new StringName("test3.test4");
    arrName = new StringArrayName(["test3", "test4"]);
    expect(strName.isEqual(arrName)).toBe(true);
  });
});

  
  