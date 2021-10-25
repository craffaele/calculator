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
  // these tranches will be replaced in our larger expression with their resulting evaluations.
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
  const ops = [['*', '/'], ['+', '-']];
  // handle all (multiplication, division) > then (addition, subtraction)
  for (let op of ops) {
    console.log('for loop');
    const findNextOperatorIndex = (exp, firstIndex, secondIndex) => {
      if (firstIndex === secondIndex) {
        return -1;
      } else if (firstIndex === -1 || secondIndex === -1) {
        return Math.max( exp.indexOf(op[0]), exp.indexOf(op[1]) );
      } else {
        return Math.min( exp.indexOf(op[0]), exp.indexOf(op[1]) );
      }
    }
    let opIndex = findNextOperatorIndex(exp, exp.indexOf(op[0]), exp.indexOf(op[1]));
    let currentOp = exp[opIndex];

    while (opIndex !== -1) {
      console.log('while loop');
      exp = search(exp, currentOp, opIndex);
      // reassign opIndex
      opIndex = findNextOperatorIndex(exp, exp.indexOf(op[0]), exp.indexOf(op[1]));
      currentOp = exp[opIndex];
    }
  }
  // since any items left in this array will have been evaluated to integers and stripped of parens,
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
      const sliceResult = evaluate(inParen);
      newExpression.splice(openParenIndex, i - openParenIndex + 1, sliceResult);
      return newExpression;
    }
    i++;
  }
}

module.exports.evaluate = evaluate;


