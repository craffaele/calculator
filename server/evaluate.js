const evaluate = (expression) => {
  // const splitExpression = expression.split(/[^0-9\.]+/g);
  let newExpression;

  if (!Array.isArray(expression)) {
    newExpression = expression.split(/(?=[+\-/*()])|(?<=[+\-/*()])/g);
  } else {
    newExpression = expression;
  }

  // another function to check parens called here
  const evaluateParens = (firstOpenIndex, exp) => {
    let openParenIndex;
    for (let i = firstOpenIndex; i < exp.length; i++) {
      let current = exp[i];
      console.log('paren loop log:', exp[i]);
      if (current === '(' ) {
        openParenIndex = i;
      } else if (current === ')') {
        const res = evaluate(exp.slice(openParenIndex + 1, i));
        let newExp = spliceExpression(exp, openParenIndex, i, res);
        console.log('newExp:', newExp);
        return newExp;
      }
    }
  }

  const spliceExpression = (exp, from, end, newVal) => {
    return exp.slice(0, from).concat(newVal, exp.slice(end + 1));
  }

  const parenStart = newExpression.indexOf('(');
  if (parenStart !== -1) {
    newExpression = evaluateParens(parenStart, newExpression);
    console.log('expressionWithoutParens:', newExpression);
    return evaluate(newExpression);
  }

  ////// NO PARENS BEYOND THIS POINT

  const result = stage(newExpression);
  console.log('result:', Number(result));
  return result;
}

const stage = (exp) => {
  console.log('stage log', exp);

  const ops = [['*', '/'], ['+', '-']];
  // (multiplication, division) > (addition, subtraction)
  for (let op of ops) {

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
      exp = search(exp, currentOp, opIndex);
      // reassign opIndex
      opIndex = findNextOperatorIndex(exp, exp.indexOf(op[0]), exp.indexOf(op[1]));
      currentOp = exp[opIndex];
    }
  }
  return exp[0];
}

const search = (exp, op, opIndex) => {
  let firstVal = Number(exp[opIndex-1]);
  let secondVal = Number(exp[opIndex+1]);
  // change exp in place—-replace expression tranche with evaluation
  const trancheResult = solve(firstVal, secondVal, op);
  exp.splice(opIndex - 1, 3, trancheResult);
  return exp;
}

const solve = (firstVal, secondVal, op) => {
  console.log('solving this:', firstVal, op, secondVal);
  switch(op) {
    case '*' : return firstVal * secondVal;
    case '/' : return firstVal / secondVal;
    case '+' : return firstVal + secondVal;
    case '-' : return firstVal - secondVal;
  }
}

module.exports.evaluate = evaluate;


