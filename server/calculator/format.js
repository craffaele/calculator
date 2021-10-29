const evaluate = require('./evaluate');

const format = (expression) => {

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
  if (parenStart !== -1) {
    if (checkBalancedParens(expression, parenStart) === false) {
      return 'Parens not balanced.'
    }
  }

  // splits arithmetic string along operators while keeping the operators in as delimiters.
  // exception is '-', which is kept prepended to the beginning of integer strings.
  const splitExpression = expression.split(/(?=[+\-/*()])|(?<=[+/*()])/g);

  // format arithmetic array by creating a new copy with correct operators. see below.
  let formattedExpression = [];
  for (let i = 0; i< splitExpression.length; i++) {
    const currentItem = splitExpression[i];
    const nextItem = splitExpression[i + 1];
    const prevItem = splitExpression[i - 1];

    // this logic replaces any double minus operators that remain with a '+'.
    // the ONLY case for this is when you have an expression with '--' just before a '('.
    // in that case, our regex would not have known to leave the '-' prepended.
    if (currentItem === '-' && nextItem === '-') {
      continue;
    }
    if (currentItem === '-' && prevItem === '-') {
      formattedExpression.push('+');
      continue;
    }

    // insert '+' between any two integers without operators between them.
    // this would be owing to the fact that '-' remains prepended to integers according to our regex.
    // so instead of subtracting per se, in most cases we will be adding negatives together.
    formattedExpression.push(currentItem);
    if (!isNaN(Number(currentItem)) && !isNaN(Number(nextItem))) {
      formattedExpression.push('+');
    }
  }
  // proceed to evaluation with formatted expression.
  return evaluate(formattedExpression);
}

module.exports = format;