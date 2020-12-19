import React, { useRef } from 'react';
import { useImmerReducer } from 'use-immer';

interface nowState {
    id: string;
    text: string | null;
}

const initialState:nowState[] = [];
const reducer = (draft: (nowState[] | undefined), action: {type: string; item?: nowState}) => {
  switch (action.type) {
    case "ADD_ITEM":
        if (action.item && draft) {
            draft.push(action.item);
        }
      return;
    case "CLEAR_LIST":
      return initialState;
    default:
      return draft;
  }
}
const Todo = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem = {
      id: Math.random() + '',
      text: inputEl.current && inputEl.current.value
    };
    dispatch({ type: "ADD_ITEM", item: newItem });
    if (inputEl.current) {
        inputEl.current.value = "";
        inputEl.current.focus();
    }
  }
  
  const handleClear = () => {
    dispatch({ type: 'CLEAR_LIST' })
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
        <ul>
          {(state as nowState[]).map(todo => {
            return <li key={todo.id}>{todo.text}</li>;
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type='text' ref={inputEl} />
          <button
            type='submit'
          >
            Add Todo
          </button>
        </form>
        <button
          onClick={handleClear}
        >
          Clear Todos
        </button>
      </header>
    </div>
  );
}
export default Todo;