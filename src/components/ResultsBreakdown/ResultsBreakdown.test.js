import React from 'react';
import ReactDOM from 'react-dom';
import ResultsBreakdown from "./index";

import { mount } from "enzyme";

describe("ResultsBreadown", () => {
  const setup = propOverrides => {
    const props = {
      income: 0,
      bracket: 0,
      ...propOverrides
    };
    const root = mount(<ResultsBreakdown {...props} />);
    return {
      root,
      props
    };
  };

  test('renders without crashing', () => {
    const div = document.createElement('div');
    const { props } = setup();
    ReactDOM.render(<ResultsBreakdown {...props}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("shows the taxes calculation breakdown grid component", () => {
    const { root } = setup();
    const bracketGrid = findTaxesBreakdownGrid(root);
    expect(bracketGrid).toHaveLength(1);
  });

  describe("shows the calculation of how federal taxes are added by tax bracket", () => {
    const { root } = setup({
      income: 250000,
      bracket: 4
    });
    const bracketGrid = findTaxesBreakdownGrid(root);

    describe("by displaying the breakdown for the first bracket", () => {
      const bracket = findBreakdownPair(bracketGrid, 1);

      test("with the correct explanation", () => {
        expect(bracket.find(".explanation").text()).toEqual("15% on the first $47,630 of taxable income")
      });

      test("and the correct tax amount for that bracket", () => {
        expect(bracket.find(".sub-amount").text()).toEqual("$7,145")
      });
    });

    describe("by displaying the breakdown for the second bracket", () => {
      const bracket = findBreakdownPair(bracketGrid, 2);

      test("with the correct explanation", () => {
        expect(bracket.find(".explanation").text()).toEqual("20.5% on the next $47,629, the portion of taxable income over $47,630 up to $95,259")
      });

      test("and the correct tax amount for that bracket", () => {
        expect(bracket.find(".sub-amount").text()).toEqual("$9,763")
      });
    });

    describe("by displaying the breakdown for the third bracket", () => {
      const bracket = findBreakdownPair(bracketGrid, 3);

      test("with the correct explanation", () => {
        expect(bracket.find(".explanation").text()).toEqual("26% on the next $52,408, the portion of taxable income over $95,259 up to $147,667")
      });

      test("and the correct tax amount for that bracket", () => {
        expect(bracket.find(".sub-amount").text()).toEqual("$13,627")
      });
    });

    describe("by displaying the breakdown for the fourth bracket", () => {
      const bracket = findBreakdownPair(bracketGrid, 4);

      test("with the correct explanation", () => {
        expect(bracket.find(".explanation").text()).toEqual("29% on the next $62,704, the portion of taxable income over $147,667 up to $210,371")
      });

      test("and the correct tax amount for that bracket", () => {
        expect(bracket.find(".sub-amount").text()).toEqual("$18,184")
      });
    });

    describe("by displaying the breakdown for the fifth bracket", () => {
      const bracket = findBreakdownPair(bracketGrid, 5);

      test("with the correct explanation", () => {
        expect(bracket.find(".explanation").text()).toEqual("33% on the remaining taxable income over $210,371, equaling to $39,629")
      });

      test("and the correct tax amount for that bracket", () => {
        expect(bracket.find(".sub-amount").text()).toEqual("$13,078")
      });
    });

    test("and the sum of all amounts in each tax bracket equal the total tax", () => {
      const taxBracketOne = getTaxBracketSubAmount(bracketGrid, 1);
      const taxBracketTwo = getTaxBracketSubAmount(bracketGrid, 2);
      const taxBracketThree = getTaxBracketSubAmount(bracketGrid, 3);
      const taxBracketFour = getTaxBracketSubAmount(bracketGrid, 4);
      const taxBracketFive = getTaxBracketSubAmount(bracketGrid, 5);
      const totalTaxAmount = taxBracketOne + taxBracketTwo + taxBracketThree + taxBracketFour + taxBracketFive;
      expect(totalTaxAmount).toEqual(61797);
    });
  });
});

function findTaxesBreakdownGrid(root) {
  return root.find(".bracket-amounts");
}

function findBreakdownPair(grid, bracket) {
  return grid.find(`.bracket-${bracket}`);
}

function getTaxBracketSubAmount(grid, bracket) {
  const textAmount = findBreakdownPair(grid, bracket).find(".sub-amount").text();
  return parseInt(textAmount.replace(/\D/g,''), 10);
}