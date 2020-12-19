import produce, { applyPatches, Patch, produceWithPatches } from 'immer';
import {enablePatches} from "immer"
enablePatches()

// Immer records all the changes that are performed on the draft object 
// and generates an array of JSON objects indicating what has changed. 
// These arrays are called Patches.

// interface Patch {
//     op: "replace" | "remove" | "add" // 一次更改的动作类型
//     path: (string | number)[] // 此属性指从树根到被更改树杈的路径
//     value?: any // op为 replace、add 时，才有此属性，表示新的赋值
//   }

// produce(
//     currentState, 
//     recipe,
//     // 通过 patchListener 函数，暴露正向和反向的补丁数组
//     patchListener: (patches: Patch[], inversePatches: Patch[]) => void
//   )
  
//   applyPatches(currentState, changes: (patches | inversePatches)[]): nextState
  

let state = {
    name: "jo",
    age: 32
};

let replaces:Patch[] = [];
let inverseReplaces:Patch[] = [];

export const test = () => {
    let nextState = produce(state, draft => {
        draft.age = 40;
    }, (patches, inversePatches) => {
        console.log(patches); // [ { op: 'replace', path: [ 'age' ], value: 40 } ]
        replaces = patches.filter(patch => patch.op === 'replace');
        console.log(inversePatches);  // [ { op: 'replace', path: [ 'age' ], value: 32 } ]
        inverseReplaces = inversePatches.filter(patch => patch.op === 'replace');
    });

    console.log(nextState);  //{name: 'jo', age: 40}

    nextState = produce(nextState, draft => {
        draft.age = 55;
    })

    console.log(nextState); //{name: 'jo', age: 55}

    nextState = applyPatches(nextState, replaces);
    console.log(nextState);  //{name: 'jo', age: 40}
    nextState = applyPatches(nextState, inverseReplaces);
    console.log(nextState);   //{name: 'jo', age: 32}


    const [nextNumState, patches, inversePatches] = produceWithPatches(
        {
            age: 34
        },
        draft => {
            draft.age++
        }
    );

    console.log(nextNumState, patches, inversePatches)
    // [
    //     {
    //         age: 34
    //     },
    //     [
    //         {
    //             op: "replace",
    //             path: ["age"],
    //             value: 34
    //         }
    //     ],
    //     [
    //         {
    //             op: "replace",
    //             path: ["age"],
    //             value: 33
    //         }
    //     ]
    // ]
}