import { combineReducers, createStore } from 'redux';
import todoListReducer from './todoList/reducer';

export const rootReducer = combineReducers({
    todoList: todoListReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;