import produce from 'immer';

// 柯里化，produce中接收的参数就是mapper接收的参数
const mapper = produce((draft, index) => {
    draft.index = index;
})

export const test = () => {
    console.log([{}, {}, {}].map(mapper)) //[{index: 0}, {index: 1}, {index: 2}])
}