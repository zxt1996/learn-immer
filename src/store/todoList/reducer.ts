import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import { TodoListActionConstants } from './types';
import { TodoListActionTypes } from './actions';

export type Todo = {
    key: string;
    text: string;
    completed: boolean;
}

export type TodoListState = Readonly<{
    list: Todo[]
}>

const initialTodoListState: TodoListState = {
    list: []
};

const todoListReducer: Reducer<TodoListState, TodoListActionTypes> = produce(
    (draftState: Draft<TodoListState>, action: TodoListActionTypes) => {
        switch (action.type) {
            case TodoListActionConstants.ADD_TODO:
                const addTodoKey = `${Date.now()}__${draftState.list.length}`;
                const addTodo: Todo = { key: addTodoKey, text: action.payload, completed: false };
                draftState.list.unshift(addTodo);
                break;
            case TodoListActionConstants.DELETE_TODO:
                const deleteTodoIndex = draftState.list.findIndex(todo => todo.key === action.payload);
                draftState.list.splice(deleteTodoIndex, 1);
                break;
        }
    },
    initialTodoListState
)

export default todoListReducer;