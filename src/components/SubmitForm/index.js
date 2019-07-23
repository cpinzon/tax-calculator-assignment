import React, { Component } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import './styles.css';

class SubmitForm extends Component {
  static propTypes = {
    calculateFederalTax: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      income: "",
      formError: false
    };
  }

  handleSubmit = (event) => {
    if (this.state.income === "" || this.state.income <= 0) {
      event.preventDefault();
      this.setState({formError: true})
    } else {
      this.props.calculateFederalTax(this.state.income)
    }
  };

  handleChange = (event) => {
    this.setState({income: event.target.value, formError: false});
  }

  render() {
    const { income, formError } = this.state;
    const buttonClasses = classNames('btn', 'submit', { disabled: income === "" });
    const inputClasses = classNames('income-input', { error: formError });

    return (
      <div className="submit-income-form">
        <h2 className="title">Use this calculator to quickly estimate your 2019 federal taxes</h2>
        <form
          id="image-appeal"
          name="image-appeal"
          className="submit-form"
          onSubmit={this.handleSubmit}
        >
          <label className="income-label" htmlFor="grossAnnualIncome">Enter your gross annual income here</label>
          <input
            className={inputClasses}
            id="grossAnnualIncome"
            name="grossAnnualIncome"
            type="number"
            value={income}
            onChange={this.handleChange}
            placeholder="$ 999999"
          />
          {formError && <span className="form-error-text">A positive number income needs to be provided</span>}
          <div className="submit-wrapper">
            <button className={buttonClasses} disabled={income === ""}>Calculate</button>
          </div>
        </form>
      </div>

    );
  }
}

export default SubmitForm;
