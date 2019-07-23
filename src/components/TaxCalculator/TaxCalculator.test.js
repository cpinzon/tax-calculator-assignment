import React from 'react';
import ReactDOM from 'react-dom';
import TaxCalculator from "./index";

import { mount } from "enzyme";

describe("TaxCalculator", () => {
  const setup = propOverrides => {
    const props = {
      ...propOverrides
    };
    const root = mount(<TaxCalculator {...props} />);
    return {
      root,
      props
    };
  };

  test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<TaxCalculator />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("shows the submit income form at initial render", () => {
    const { root } = setup();
    expect(findSubmitForm(root)).toHaveLength(1);
    expect(findResultsPage(root)).toHaveLength(0);
  });

  test("only shows the tax calculation results page once tax is calculated", () => {
    const { root } = setup();
    root.setState({
      income: 80000,
      taxAmount: 13780.85,
      bracket: 1
    })
    expect(findSubmitForm(root)).toHaveLength(0);
    expect(findResultsPage(root)).toHaveLength(1);
  });

  describe("calculates federal tax and bracket from an income", () => {

    test("that is less than or equal to $47,630", () => {
      const { root, props } = setup();
      root.instance().calculateFederalTax(46000);
      expect(root.state()).toEqual({
        income: 46000,
        taxAmount: 6900,
        bracket: 0
      });
    });

    test("that is larger than $47,630 and less than or equal than $95,259", () => {
      const { root } = setup();
      root.instance().calculateFederalTax(80000);
      expect(root.state()).toEqual({
        income: 80000,
        taxAmount: 13780.85,
        bracket: 1
      });
    });

    test("that is larger than $95,259 and less than or equal than $147,667", () => {
      const { root } = setup();
      root.instance().calculateFederalTax(100000);
      expect(root.state()).toEqual({
        income: 100000,
        taxAmount: 18140.66,
        bracket: 2
      });
    });

    test("that is larger than $147,667 and less than or equal than $210,371", () => {
      const { root } = setup();
      root.instance().calculateFederalTax(175000);
      expect(root.state()).toEqual({
        income: 175000,
        taxAmount: 38461.57,
        bracket: 3
      });
    });

    test("that is larger than $210,371", () => {
      const { root } = setup();
      root.instance().calculateFederalTax(250000);
      expect(root.state()).toEqual({
        income: 250000,
        taxAmount: 61796.57,
        bracket: 4
      });
    });
  });
});

function findSubmitForm(root) {
  return root.find(".submit-income-form");
}

function findResultsPage(root) {
  return root.find(".results-page");
}
