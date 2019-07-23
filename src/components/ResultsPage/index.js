import React, { Component } from 'react';
import PropTypes from "prop-types";
import CurrencyFormat from 'react-currency-format';
import ResultsBreakdown from '../ResultsBreakdown';
import './styles.css';

class ResultsPage extends Component {
  static propTypes = {
    income: PropTypes.number.isRequired,
    taxAmount: PropTypes.number.isRequired,
    bracket: PropTypes.number.isRequired
  };

  render() {
    debugger;
    const { income, taxAmount, bracket } = this.props;
    const effectiveTaxRate = (taxAmount / income)*100;
    return (
      <div className="results-page">
        <div className="tax-results-section">
          <h2 className="title">Results</h2>
          <p>Note: these are rounded to whole numbers, except the effective tax rate</p>
          <div className="tax-results">
            <span className="label">Your gross annual income</span>
            <span className="amount income">
              <CurrencyFormat value={income} decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </span>
            <span className="label">Total federal tax</span>
            <span className="amount total-tax">
              <CurrencyFormat value={taxAmount} decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </span>
            <span className="label">Effective tax rate</span>
            <span className="amount tax-rate">
              <CurrencyFormat value={effectiveTaxRate} displayType={'text'} decimalScale={2} suffix={'%'} />
            </span>
          </div>
        </div>
        <ResultsBreakdown income={income} bracket={bracket}/>
      </div>

    );
  }
}

export default ResultsPage;
