import { flattenObject } from "./flatten";

const obj = { a: 1, 
    b: { c: "hello", d: true }, 
    f: [{ g: "world" }], 
};

console.log("input:", JSON.stringify(obj, null, 2)); 
console.log("flattened:", JSON.stringify(flattenObject(obj), null, 2));
