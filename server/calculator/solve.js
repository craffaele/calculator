const Decimal = require('decimal.js-light');

const solve = (exp, op, opIndex) => {

  const doTheMath = (firstVal, secondVal, operator) => {
    // firstVal is used to construct a methodValue for access to precision methods.
    const methodValue = new Decimal(firstVal);
    switch(operator) {
      case '*' : return methodValue.mul(secondVal);
      case '/' : return methodValue.div(secondVal);
      case '+' : return methodValue.add(secondVal);
      case '-' : return methodValue.sub(secondVal);
    }
  }

  let firstInt = Number(exp[opIndex-1]);
  let secondInt = Number(exp[opIndex+1]);
  // replace expression tranche with evaluation.
  const sliceResult = doTheMath(firstInt, secondInt, op);
  exp.splice(opIndex - 1, 3, sliceResult);
  return exp;
}

module.exports = solve;