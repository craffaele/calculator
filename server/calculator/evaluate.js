const solve = require('./solve');

const evaluate = (expression) => {

  const evalParens = (firstOpenIndex, exp) => {
    let openingIndex;
    let newExpression = exp;
    let i = firstOpenIndex;
    while (i < exp.length) {
      let current = exp[i];
      if (current === '(' ) {
        openingIndex = i;
      } else if (current === ')') {
        const expressionInParen = exp.slice(openingIndex + 1, i);
        const sliceResult = evaluate(expressionInParen);
        newExpression.splice(openingIndex, i - openingIndex + 1, sliceResult);
        return newExpression;
      }
      i++;
    }
  }

  // if there are parens in this expression, pass them to our paren evaluator function above,
  // which will slice out the paren expressions left-to-right and pass them back through here for evaluation.
  // these slices will be replaced in our larger expression with their resulting evaluations.

  // although we've previously checked for parens in our ratify function, we need another check here given
  // the recursive nature of this evaluate function.

  const parenStart = expression.indexOf('(');
  if (parenStart !== -1) {
    const newExpression = evalParens(parenStart, expression);
    return evaluate(newExpression);
  }

  const parseExpressions = (exp) => {
    const operators = [['*', '/'], ['+', '-']];
    for (let op of operators) {
      // handle all (multiplication, division) --> then all (addition, subtraction)
      const findNextOperatorIndex = (exp, firstIndex, secondIndex) => {
        if (firstIndex === secondIndex) {
          // if these values are equivalent, then both indexes are -1, and thus neither operator is present.
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
      // retrieve the index of the operator we need to deal with now...
      let opIndex = findNextOperatorIndex(exp, exp.indexOf(op[0]), exp.indexOf(op[1]));
      /// and using that index, store a reference to the operator itself as well.
      let currentOp = exp[opIndex];
      let check = 0;
      while (opIndex !== -1 && check < 10) {
        console.log('loop');
        console.log('opIndex:', opIndex);

        exp = solve(exp, currentOp, opIndex);
        // reassign operator index.
        opIndex = findNextOperatorIndex(exp, exp.indexOf(op[0]), exp.indexOf(op[1]));
        currentOp = exp[opIndex];
        check++;
      }
    }
    // since any items left in this array will have been evaluated to integers and stripped of parens,
    // reducing the remaining items with multiplication will handle * functionality for parens.
    return exp.reduce((a, b) => a * b);
  }
  // parse out expressions and send them to solving function.
  return parseExpressions(expression);
}

module.exports = evaluate;


