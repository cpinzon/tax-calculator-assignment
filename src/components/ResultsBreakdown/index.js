import React, { Component } from 'react';
import PropTypes from "prop-types";
import CurrencyFormat from 'react-currency-format';
import './styles.css';
import { TAX_BRACKETS, BRACKET_STRINGS } from "../../calculateTax";

const BreakdownGrid = ({income, taxBracket}) => (
  <div className="bracket-amounts">
  {
    TAX_BRACKETS.map((bracket, i) => (
      <BreakdownItem key={i} income={income} currentBracket={bracket} index={i} taxBracket={taxBracket}/>
    ))
  }
  </div>
);

const BreakdownItem = ({income, currentBracket, index, taxBracket}) => (
  <div className={`bracket bracket-${index+1}`}>
    {
      index <= taxBracket &&
        <span className="explanation">
          {taxBracket === index && BRACKET_STRINGS[index].equalThan}
          {taxBracket > index && BRACKET_STRINGS[index].largerThan}
          {
            taxBracket === index &&
            <CurrencyFormat
              value={income-currentBracket.min}
              decimalScale={0}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'} />
          }
        </span>
    }
    {
      index <= taxBracket &&
      <span className="sub-amount">
        {
          taxBracket === index &&
          <CurrencyFormat
            value={(income - currentBracket.min)*currentBracket.rate}
            decimalScale={0}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'} />
        }
        {
          taxBracket > index &&
          <CurrencyFormat
            value={currentBracket.bracketTax}
            decimalScale={0}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'} />
        }
      </span>
    }
  </div>
);


class ResultsBreakdown extends Component {
  static propTypes = {
    income: PropTypes.number.isRequired,
    bracket: PropTypes.number.isRequired
  };

  render() {
    const {income, bracket} = this.props;
    return (
      <div className="taxes-breakdown">
        <h3>Breakdown of Federal tax rates for 2019</h3>
        <span className="subtitle">This is how your federal taxes are tabulated:</span>
        <BreakdownGrid income={income} taxBracket={bracket} />
      </div>

    );
  }
}

export default ResultsBreakdown;
