// This module contains several constants needed to 
// - calculate the total federal tax
// - display the breakdown of a sum of federal tax by bracket
// And a function that performs the calculation
export const TAX_BRACKETS =[
  {
    min:0,
    max:47630,
    rate:0.15,
    baseTax:0,
    bracketTax:7145
  },
  {
    min:47630,
    max:95259,
    rate:0.205,
    baseTax:7145,
    bracketTax:9763
  },
  {
    min:95259,
    max:147667,
    rate:0.26,
    baseTax:16908,
    bracketTax:13627
  },
  {
    min:147667,
    max:210371,
    rate:0.29,
    baseTax:30535,
    bracketTax:18184
  },
  {
    min:210371,
    rate:0.33,
    baseTax:48719
  }
];

export const BRACKET_STRINGS = [
  {
    largerThan: "15% on the first $47,630 of taxable income",
    equalThan: "15% on taxable income less than $47,630"
  },
  {
    largerThan: "20.5% on the next $47,629, the portion of taxable income over $47,630 up to $95,259",
    equalThan: "20.5% of the remaining taxable income less than $95,259, equaling to  "
  },
  {
    largerThan: "26% on the next $52,408, the portion of taxable income over $95,259 up to $147,667",
    equalThan: "26% of the remaining taxable income less than $147,667, equaling to "
  },
  {
    largerThan: "29% on the next $62,704, the portion of taxable income over $147,667 up to $210,371",
    equalThan: "29% of the remaining taxable income less than $210,371, equaling to "
  },
  {
    largerThan: null,
    equalThan: "33% on the remaining taxable income over $210,371, equaling to "
  }
];

// This is the function that does the heavy lifting.
// It will go through each bracket, determine to which bracket the user belongs to,
// and calculate the taxes. Since we have the base amounts provided from the following url,
// we can highly simplify the formula
// https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-yearsl

// Formula: user's income MINUS min limit of the bracket it belongs to, this result is then
// MULTIPLIED by the bracket's tax rate, and ultimately added to the base tax amount
// (the resulting tax for the maxmimum amount of each bracket)
export function calculateTaxes(incomeNum) {
  let tax, bracket = 0;
  const income = Number(incomeNum);
  for(let i = 0; i < TAX_BRACKETS.length; i++) {
    if (income > TAX_BRACKETS[i].min && (TAX_BRACKETS[i].max === undefined || income <= TAX_BRACKETS[i].max)) {
      bracket = i;
      tax = (income - TAX_BRACKETS[i].min)*TAX_BRACKETS[i].rate + TAX_BRACKETS[i].baseTax;
      break;
    }
  }
  return {income: income, taxAmount: Number(tax.toFixed(2)), bracket: bracket}
};