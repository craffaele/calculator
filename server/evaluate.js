const evaluate = (expression) => {
  console.log('expression---------->', expression);

  // if this is our first interaction with the expression, it will be a string that we first need
    // to delimit along the operators (and parens), but keeping the operators in the resulting array.
    // otherwise, if the expression is already an array, we leave it alone.
  let newExpression;
  if (!Array.isArray(expression)) {
    newExpression = expression.split(/(?=[+\-/*()])|(?<=[+\-/*()])/g);
  } else {
    newExpression = expression;
  }

  // if there are parens in the expression, pass them to our parser function,
    // which will slice out the paren expressions left-to-right and pass them back through here for evaluation.
    // these slices will be replaced in our larger expression with their resulting evaluations.
  const parenStart = newExpression.indexOf('(');
  if (parenStart !== -1) {
    newExpression = evaluateParens(parenStart, newExpression);
    return evaluate(newExpression);
  }

  const result = stage(newExpression);
  console.log('result:', Number(result));
  return result;
}

const stage = (exp) => {
  const operators = [['*', '/'], ['+', '-']];
  // handle all (multiplication, division) > then all (addition, subtraction)
  for (let op of operators) {
    // we will address one set of operators at a time according to order of operations.
    // all multiplication and division first left-to-right, then same for all addition and subtraction.
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
      exp = search(exp, currentOp, opIndex);
      // reassign opIndex
      opIndex = findNextOperatorIndex(exp, exp.indexOf(op[0]), exp.indexOf(op[1]));
      currentOp = exp[opIndex];
    }
  }
  // since any items left in this array will have been evaluated to integers and stripped of any parens,
  // reducing the remaining items with multiplication will handle * functionality for parens.
  return exp.reduce((a, b) => a * b);
}

// put away
const search = (exp, op, opIndex) => {
  let firstVal = Number(exp[opIndex-1]);
  let secondVal = Number(exp[opIndex+1]);
  // replace expression tranche with evaluation.
  const trancheResult = solve(firstVal, secondVal, op);
  exp.splice(opIndex - 1, 3, trancheResult);
  return exp;
}

// put away
const solve = (firstVal, secondVal, operator) => {
  switch(operator) {
    case '*' : return firstVal * secondVal;
    case '/' : return firstVal / secondVal;
    case '+' : return firstVal + secondVal;
    case '-' : return firstVal - secondVal;
  }
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


