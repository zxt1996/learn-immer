import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
// import Users from './components/users';
// import { test } from './demo/about-produce';
// import { test } from './demo/about-producer';
// import { test } from './demo/about-current';
// import { test } from './demo/about-patches';
// import UserCardEditor from './components/UserCardEditor';
import Todo from './components/useForm';
import TodoList from './containers/TodoList';

function App() {
  // useEffect(() => {
  //   test();
  // }, []);
  return (
    <Provider store={store}>
      <div className="App">
        {/* <Users/> */}
        {/* <UserCardEditor/> */}
        {/* <Todo/> */}
        <TodoList/>
      </div>
    </Provider>
  );
}

export default App;
