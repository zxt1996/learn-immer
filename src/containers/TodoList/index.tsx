import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import produce, { Draft } from 'immer';
import { RootState } from '../../store/index';
import { TodoListState } from '../../store/todoList/reducer';
import * as Actions from '../../store/todoList/actions';

type State = {
    value: string
}

const TodoList = () => {
    const initState: State = {
        value: ''
    }

    const [state, setState] = useState(initState);
    // const result: any = useSelector(selector: Function, equalityFn?: Function)
    // Allows you to extract data from the Redux store state
    // useSelector hook will cause your component to be rerender every time an action is dispatched.
    // shallow comparison of the result object, 即使用shallowEqual进行浅层比较
    const { list } = useSelector<RootState, TodoListState>(state => state.todoList, shallowEqual);
    const dispatch = useDispatch();

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value.trim();
        setState(
            produce((draftState: Draft<State>) => {
                draftState.value = value;
            })
        )
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const keyValue = event.key;
        const { value } = state;

        if (keyValue === 'Enter' && value) {
            dispatch(Actions.addTodo(value));
            setState(
                produce((draftState: Draft<State>) => {
                    draftState.value = '';
                })
            )
        }
    }

    const handleRemoveTodo = (event: React.MouseEvent<HTMLSpanElement>): void => {
        const parent = event.currentTarget.closest("li") as HTMLLIElement;
        const key = parent.dataset.key ?? '';
        dispatch(Actions.removeTodo(key));
    }

    return (
        <div>
            <div className="todo-list__title">ToDoList</div>
            <input
                className="todo-list__input"
                type="text"
                value={state.value}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
            />
            {list.length ? (
                <>
                <ul className="todo-list__list">
                    {list.map(todo => (
                    <li key={todo.key} data-key={todo.key}>
                        <span onClick={handleRemoveTodo}>
                            删除：{todo.text}
                        </span>
                    </li>
                    ))}
                </ul>
                </>
            ) : (
                <div className="todo-list__empty">空空如也~</div>
            )}
        </div>
    )
}

export default React.memo(TodoList);