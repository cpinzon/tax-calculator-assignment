import React from 'react';
import ReactDOM from 'react-dom';
import SubmitForm from "./index";

import { mount } from "enzyme";

describe("SubmitForm", () => {
  const setup = propOverrides => {
    const props = {
      calculateFederalTax: jest.fn(),
      ...propOverrides
    };
    const root = mount(<SubmitForm {...props} />);
    return {
      root,
      props
    };
  };

  test('renders without crashing', () => {
    const div = document.createElement('div');
    const { props } = setup();
    ReactDOM.render(<SubmitForm {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe("displays form for submitting income with", () => {
    test("shows number input for typing income with label", () => {
      const { root } = setup();
      const incomeInput = findIncomeInput(root);
      const incomeInputLabel = findIncomeInputLabel(root);
      expect(incomeInput).toHaveLength(1);
      expect(incomeInputLabel).toHaveLength(1);
    });

    test("shows submit button", () => {
      const { root } = setup();
      const submitButton = findCalculateButton(root);
      expect(submitButton).toHaveLength(1);
    });

    test("allows user to input their income and save it in state", () => {
      const { root } = setup();
      const incomeInput = findIncomeInput(root);
      incomeInput.simulate('focus');
      incomeInput.simulate('change', { target: { value: 85000 } });
      expect(root.state()).toEqual({
        income: 85000,
        formError: false
      })
    });

    describe("when the user has not submitted any income", () => {
      test("the submit button must be disabled", () => {
        const { root } = setup();
        const submitButton = findCalculateButton(root);
        expect(submitButton.prop("disabled")).toEqual(true);
      });

      test("the submit button must have disabled styling", () => {
        const { root } = setup();
        const submitButton = findCalculateButton(root);
        expect(submitButton.hasClass('disabled')).toEqual(true);
      });
    });

    describe("when the income is not a valid number and the user clicks submit", () => {
      test("the form error state is set", () => {
        const { root } = setup();
        const incomeInput = findIncomeInput(root);
        const submitForm = findSubmitForm(root);
        incomeInput.simulate('focus');
        incomeInput.simulate('change', { target: { value: -111111 } });
        submitForm.simulate('submit');
        expect(root.state("formError")).toEqual(true);
      });
      test("the income input is displayed with error validation styling", () => {
        const { root } = setup();
        const incomeInput = findIncomeInput(root);
        const submitForm = findSubmitForm(root);
        incomeInput.simulate('focus');
        incomeInput.simulate('change', { target: { value: 0 } });
        submitForm.simulate('submit');
        expect(findIncomeInput(root).hasClass("error")).toEqual(true);
      });
      test("an error message displayed below the input", () => {
        const { root } = setup();
        const incomeInput = findIncomeInput(root);
        const submitForm = findSubmitForm(root);
        incomeInput.simulate('focus');
        incomeInput.simulate('change', { target: { value: -111111 } });
        submitForm.simulate('submit');
        expect(root.find(".form-error-text")).toHaveLength(1);
      });

    });
  });
});

function findCalculateButton(root) {
  return root.find(".btn.submit");
}

function findIncomeInput(root) {
  return root.find(".income-input");
}

function findIncomeInputLabel(root) {
  return root.find(".income-label");
}

function findSubmitForm(root) {
  return root.find(".submit-form");
}