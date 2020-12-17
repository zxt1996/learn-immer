import React, { useEffect } from 'react';
import { test } from './demo/about-produce';

function App() {
  useEffect(() => {
    test();
  }, []);
  return (
    <div className="App">
    </div>
  );
}

export default App;
