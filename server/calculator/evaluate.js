const solve = require('./solve');
const stage = require('./stage');

const evaluate = (expression) => {
  // if there are parens in the expression, pass them to our paren evaluator function,
    // which will slice out the paren expressions left-to-right and pass them back through here for evaluation.
    // these slices will be replaced in our larger expression with their resulting evaluations.
  const parenStart = expression.indexOf('(');
  if (parenStart !== -1) {
    newExpression = evaluateParens(parenStart, expression);
    return evaluate(expression);
  }
  return parseExpressions(expression);
}

const parseExpressions = (exp) => {
  const operators = [['*', '/'], ['+', '-']];
  for (let op of operators) {
    // address one set of operators at a time according to order of operations.
    // handle all (multiplication, division) > then all (addition, subtraction)
    const findNextOperatorIndex = (exp, firstIndex, secondIndex) => {
      if (firstIndex === secondIndex) {
        // if these are equivalent, that means both indexes are -1, and thus neither operator is present.
        return -1;
      } else if (firstIndex === -1 || secondIndex === -1) {
        // whereas if just one of the indexes is -1, the greater of the two is the index of the present operator.
        return Math.max( exp.indexOf(op[0]), exp.indexOf(op[1]) );
      } else {
        // otherwise, if neither index is -1, an operator is present at both indexes...
        // and the lesser index represents the first one in left-to-right order.
        return Math.min( exp.indexOf(op[0]), exp.indexOf(op[1]) );
      }
    }
    // retrieve here the index of the operator we need to deal with now...
    let opIndex = findNextOperatorIndex(exp, exp.indexOf(op[0]), exp.indexOf(op[1]));
    /// and using that index, store a reference to the operator itself as well.
    let currentOp = exp[opIndex];

    while (opIndex !== -1) {
      exp = stage(exp, currentOp, opIndex);
      // reassign opIndex
      opIndex = findNextOperatorIndex(exp, exp.indexOf(op[0]), exp.indexOf(op[1]));
      currentOp = exp[opIndex];
    }
  }
  // since any items left in this array will have been evaluated to integers and stripped of any parens,
  // reducing the remaining items with multiplication will handle * functionality for parens.
  return exp.reduce((a, b) => a * b);
}

const evaluateParens = (firstOpenIndex, exp) => {
  let openParenIndex;
  let newExpression = exp;
  let i = firstOpenIndex;
  while (i < exp.length) {
    let current = exp[i];
    if (current === '(' ) {
      openParenIndex = i;
    } else if (current === ')') {
      const expressionInParen = exp.slice(openParenIndex + 1, i);
      const sliceResult = evaluate(expressionInParen);
      newExpression.splice(openParenIndex, i - openParenIndex + 1, sliceResult);
      return newExpression;
    }
    i++;
  }
}

module.exports.evaluate = evaluate;


