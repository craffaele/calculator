const evaluate = require('./evaluate').evaluate;

const ratify = (expression) => {

  // check balanced parens
  const checkBalancedParens = function(input) {
    let parenStack = [];
    for (let i = 0; i < input.length; i++) {
      let current = input[i];
      if (current === '(') {
        parenStack.push(current);
      } else if (current === ')') {
        parenStack.pop();
      }
    }
    if (parenStack.length > 0) {
      return false;
    }
    return true;
  };
  console.log('parens are balanced:', checkBalancedParens);
  if (checkBalancedParens(expression) === false) {
    return 'Error: Parens are not balanced.';
  }
  // splits along operators while keeping them in as delimiters.
  // exception is '-', which are kept appended to beginning of integers.
  const splitExpression = expression.split(/(?=[+\-/*()])|(?<=[+/*()])/g);
  console.log('prepared expression:', splitExpression);


  // insert '-' between any two integers wihtout operators between them.
  // separate function??
  let formattedExpression = [];
  for (let i =0; i< splitExpression.length; i++) {
    let currentItem = splitExpression[i];
    let nextItem = splitExpression[i + 1];
    console.log('item:', currentItem);
    formattedExpression.push(currentItem);
    if (!isNaN(Number(currentItem)) && !isNaN(Number(nextItem))) {
      formattedExpression.push('+');
    }
  }
  console.log('formatted expression:', formattedExpression);
  /// _____________________________________________________________


  return evaluate(formattedExpression);
}

module.exports = ratify;