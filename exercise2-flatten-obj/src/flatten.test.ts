import { flattenObject, Flatten } from "./flatten";

describe("flattenObject", () => { it("flattens a simple nested object", () => { const obj = { a: 1, b: { c: "hello", d: true, }, f: [{ g: "world" }], }; const expected = { "a": 1, "b.c": "hello", "b.d": true, "f.0.g": "world", }; expect(flattenObject(obj)).toEqual(expected);

    // Type assertion: Flatten<typeof obj>
    type Flat = Flatten<typeof obj>;
    const flat: Flat = flattenObject(obj);
    expect((flat as any)["b.c"]).toBe("hello");
    expect((flat as any)["f.0.g"]).toBe("world");
});

it("handles empty objects", () => {
    expect(flattenObject({})).toEqual({});
});

it("handles arrays of primitives", () => {
    const obj = { arr: [1, 2, 3] };
    const expected = { "arr.0": 1, "arr.1": 2, "arr.2": 3 };
    expect(flattenObject(obj)).toEqual(expected);
});

it("handles deeply nested structures", () => {
    const obj = { a: { b: { c: { d: 5 } } } };
    const expected = { "a.b.c.d": 5 };
    expect(flattenObject(obj)).toEqual(expected);
});

it("handles Date objects", () => {
    const date = new Date();
    const obj = { created: date, nested: { updated: date } };
    const flat = flattenObject(obj);
    // cast to any for dynamic key access (type system can't enumerate complex flattened keys)
    expect((flat as any)["created"]).toBe(date);
    expect((flat as any)["nested.updated"]).toBe(date);
});

it("handles null and undefined", () => {
    const obj = { a: null, b: undefined, c: { d: null } };
    const expected = { "a": null, "b": undefined, "c.d": null };
    expect(flattenObject(obj)).toEqual(expected);
});

it("handles keys with dots", () => {
    const obj = { "a.b": { c: 1 } };
    const expected = { "a.b.c": 1 };
    expect(flattenObject(obj)).toEqual(expected);
});
});
