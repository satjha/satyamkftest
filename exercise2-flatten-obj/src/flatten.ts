// Utility type to flatten nested objects and arrays into path-like keys 
export type Flatten<T, Prev extends string = ""> = ( 
    T extends Date ? (Prev extends "" ? { "": T } : { [K in Prev]: T }) : 
    T extends Array<infer U>
     ? { 
        [I in keyof T & `${number}` as
         Prev extends "" ? I : `${Prev}.${I}` 
        ]: T[I] extends object ? Flatten<T[I], Prev extends "" ? I : `${Prev}.${I}`>[keyof Flatten<T[I], Prev extends "" ? I : `${Prev}.${I}`>] : T[I] 
    } 
    : T extends object 
    ? { 
        [K in keyof T & (string | number) as 
            Prev extends "" ? `${K}`: `${Prev}.${K}` 
        ]: T[K] extends object 
        ? Flatten<T[K], Prev extends "" ? `${K}` : `${Prev}.${K}`>[keyof Flatten<T[K], Prev extends "" ? `${K}` : `${Prev}.${K}`>]
         : T[K]
      } 
    : (Prev extends "" ? { "": T } : { [K in Prev]: T }) 
) extends infer O ? { [K in keyof O]: O[K] } : never;

// Main function to flatten an object 

export function flattenObject<T extends Record<string, any>>(obj: T): Flatten<T> { 
    const result: Record<string, unknown> = {};

function recurse(curr: any, parentKey: string) { 
    if (curr instanceof Date) { 
        result[parentKey] = curr; 
        return; 
    } 
    if (Array.isArray(curr)) { 
       curr.forEach((item, idx) => { 
            const newKey = parentKey ? `${parentKey}.${idx}` : `${idx}`; 
            recurse(item, newKey); 
        }); 
        return; 
    } 
    if (curr && typeof curr === "object") { 
        for (const key in curr) { 
           if (!Object.prototype.hasOwnProperty.call(curr, key)) continue; 
           const newKey = parentKey ? `${parentKey}.${key}` : key; 
           recurse(curr[key], newKey); 
        } 
        return; 
    } 
    // primitives, null, undefined 
    result[parentKey] = curr; 
}

recurse(obj, ""); 
return result as Flatten<T>; 
}