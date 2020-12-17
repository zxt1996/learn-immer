import produce from 'immer';

interface AboutState {
    todo?: string;
    done?: boolean;
}
const baseState:AboutState[] = [
    {
        todo: "Learn typescript",
        done: true
    },
    {
        todo: "Try immer",
        done: false
    }
]

// Any modification you make to the draft will be recorded and used to produce nextState. 
// The currentState will be untouched during this process.
const nextState = produce(baseState, draftState => {
    draftState.push({
        todo: "Tweet about it"
    });
    draftState[1].done = true;
})

export const test: () => void = () => {
    // old state is unmodified
    console.log(baseState.length)    //2    
    console.log(baseState[1].done)     //false

    // new state reflects the draft
    console.log(nextState.length)   //3
    console.log(nextState[1].done)   //true

    // structural sharing
    console.log(baseState === nextState)       // false
    // unchanged parts are structurally shared with the previous state.
    // 即没变的部分与之前的state共享结构
    console.log(baseState[0] === nextState[0]) // true
    console.log(baseState[1] === nextState[1]) // false
}