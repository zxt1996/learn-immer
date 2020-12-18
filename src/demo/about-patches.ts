import produce, { applyPatches } from 'immer';
import {enablePatches} from "immer"
enablePatches()

// Immer records all the changes that are performed on the draft object 
// and generates an array of JSON objects indicating what has changed. 
// These arrays are called Patches.

let state = {
    name: "jo",
    age: 32
};

export const test = () => {
    const nextState = produce(state, draft => {
        draft.age = 40;
    }, (patches, inversePatches) => {
        console.log(patches); // [ { op: 'replace', path: [ 'age' ], value: 40 } ]
        console.log(inversePatches);  // [ { op: 'replace', path: [ 'age' ], value: 32 } ]
    });

    console.log(nextState);
}