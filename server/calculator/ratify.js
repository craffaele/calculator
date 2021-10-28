const evaluate = require('./evaluate');

const ratify = (expression) => {

  // check parens first. if they aren't balanced, we're done here!
  const checkBalancedParens = function(input, firstIndex) {
    let parenStack = [];
    for (let i = firstIndex; i < input.length; i++) {
      let current = input[i];
      if (current === '(') {
        parenStack.push(current);
      } else if (current === ')') {
        if (parenStack.length === 0) {
          return false;
        }
        parenStack.pop();
      }
    }
    return parenStack.length > 0 ? false : true;
  };

  const parenStart = expression.indexOf('(');
  if (expression.indexOf('(') !== -1) {
    if (checkBalancedParens(expression, parenStart) === false) {
      return 'Parens not balanced.'
    }
  }

  // splits arithmetic string along operators while keeping the operators in as delimiters.
  // exception is '-', which is kept appended to beginning of integer strings.
  const splitExpression = expression.split(/(?=[+\-/*()])|(?<=[+/*()])/g);

  // insert '-' between any two integers wihtout operators between them.
  // this would be owing to the fact that '-' remains attached to integers.
  // instead of subtracting per se, in most cases we're adding negatives together.
  let formattedExpression = [];
  for (let i =0; i< splitExpression.length; i++) {
    let currentItem = splitExpression[i];
    let nextItem = splitExpression[i + 1];
    formattedExpression.push(currentItem);
    if (!isNaN(Number(currentItem)) && !isNaN(Number(nextItem))) {
      formattedExpression.push('+');
    }
  }
  // proceed to evaluation with formatted expression.
  return evaluate(formattedExpression);
}

module.exports = ratify;