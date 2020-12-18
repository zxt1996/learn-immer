import produce, { original, current, isDraft } from 'immer';

const base = {
    x: 0
}

export const test = () => {
    const next = produce(base, draft => {
        draft.x++;
        // original that will get the original object from the proxied instance inside produce 
        // (or return undefined for unproxied values)
        const orig = original(draft);
        // 利用isDraft来判断draft是不是内部的代理实例
        console.log(isDraft(draft));  //true
        // current创建当前状态的副本
        const copy = current(draft);
        console.log(orig!.x);
        console.log(copy.x);
    
        setTimeout(() => {
            // this will execute after the produce has finised!
            console.log(orig!.x)
            console.log(copy.x)
        }, 100);
    
        draft.x++;
        console.log(draft.x);
    })
    console.log(next.x);
}

// This will print
// 0 (orig.x)
// 1 (copy.x)
// 2 (draft.x)
// 2 (next.x)
// 0 (after timeout, orig.x)
// 1 (after timeout, copy.x)