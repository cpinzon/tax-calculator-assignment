import React from 'react';
import './styles/base.css';

import TaxCalculator from "./components/TaxCalculator";

function App() {
  return (
    <div className="app-container">
      <header>
        <title>Federal Tax Calculator</title>
      </header>
      <TaxCalculator />
    </div>
  );
}

export default App;