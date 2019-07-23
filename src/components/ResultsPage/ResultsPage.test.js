import React from 'react';
import ReactDOM from 'react-dom';
import ResultsPage from "./index";

import { mount } from "enzyme";

describe("ResultsPage", () => {
  const setup = propOverrides => {
    const props = {
      income: 0,
      taxAmount: 0,
      bracket: 0,
      ...propOverrides
    };
    const root = mount(<ResultsPage {...props} />);
    return {
      root,
      props
    };
  };

  test('renders without crashing', () => {
    const div = document.createElement('div');
    const { props } = setup();
    ReactDOM.render(<ResultsPage {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("displays the user's income", () => {
    const { root } = setup({
      income: 46000,
      taxAmount: 6900,
      bracket: 0
    });
    expect(root.find(".income").text()).toEqual("$46,000");
  });

  test("displays the calculated federal tax amount", () => {
    const { root } = setup({
      income: 175000,
      taxAmount: 38461.57,
      bracket: 3
    });
    expect(root.find(".total-tax").text()).toEqual("$38,462");
  });

  test("displays the calculated effective tax rate ", () => {
    const { root } = setup({
      income: 100000,
      taxAmount: 18140.66,
      bracket: 2
    });
    expect(root.find(".tax-rate").text()).toEqual("18.14%");
  });

  test("shows the results breakdown component", () => {
    const { root } = setup();
    expect(root.find(".taxes-breakdown")).toHaveLength(1);
  });
});
