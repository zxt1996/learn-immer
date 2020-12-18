import React, { useEffect } from 'react';
// import Users from './components/users';
// import { test } from './demo/about-produce';
// import { test } from './demo/about-producer';
// import { test } from './demo/about-current';
import { test } from './demo/about-patches';

function App() {
  useEffect(() => {
    test();
  }, []);
  return (
    <div className="App">
      {/* <Users/> */}
    </div>
  );
}

export default App;
