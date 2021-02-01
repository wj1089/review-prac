import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './Page';

function App() {
  return (
    <>
      <Router>        
        <Page />
      </Router>
    </>
  );
}

export default App;
