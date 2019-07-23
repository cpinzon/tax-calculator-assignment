import React, { Component } from 'react';
import ResultsPage from '../ResultsPage';
import SubmitForm from "../SubmitForm";
import { calculateTaxes } from "../../calculateTax";
import './styles.css';

/**
 * This top-level component does the heavy lifting and by calculating
 * the total federal tax amount for a provided income
 * 
 * It contains two sub-components representing each screen:
 * 1. A form for submitting gross annual income
 * 2. A results page with the federal tax amount, effective tax rate and 
 * the breakdown of how the taxes are calculated by displaying how each
 * tax bracket adds up
 * 
 * It also holds the main state of the app.
 */
class TaxCalculator extends Component {

  calculateFederalTax = income => {
    this.setState(calculateTaxes(income));
  }

  constructor(props) {
    super(props);

    this.state = {
      income: 0,
      taxAmount: 0,
      bracket: 0
    };
  }

  render() {
    const { income, taxAmount, bracket } = this.state;
    return (
      <div className="tax-calculator">
        <div className="header">
          <h1>Federal Tax Calculator</h1>
        </div>
        <div className="calculator-wrapper">
          {taxAmount === 0 && <SubmitForm calculateFederalTax={this.calculateFederalTax}/>}
          {taxAmount > 0 && <ResultsPage income={income} taxAmount={taxAmount} bracket={bracket}/>}
        </div>
      </div>
    );
  }
}

export default TaxCalculator;
