import React from 'react';
import { BrowserRouter as Router
} from 'react-router-dom';
import Page from './Page';

function App() {
  // const cors = require('cors');
  // App.use(cors());
  return (
    <>
      <Router>        
        <Page />
      </Router>
    </>
  );
}

export default App;
