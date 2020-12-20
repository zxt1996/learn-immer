import { TodoListActionConstants } from './types';

export const addTodo = (text: string) => ({
    type: TodoListActionConstants.ADD_TODO,
    payload: text
} as const);

export const removeTodo = (key: string) => ({
    type: TodoListActionConstants.DELETE_TODO,
    payload: key
} as const);

export type AddTodoType = ReturnType<typeof addTodo>;
export type RemoveTodoType = ReturnType<typeof removeTodo>;

export type TodoListActionTypes = AddTodoType | RemoveTodoType