const { mul, div, add, sub } = require('sinful-math');

const solve = (exp, op, opIndex) => {

  const doTheMath = (firstVal, secondVal, operator) => {
    switch(operator) {
      case '*' : return mul(firstVal, secondVal);
      case '/' : return div(firstVal, secondVal);
      case '+' : return add(firstVal, secondVal);
      case '-' : return sub(firstVal, secondVal);
    }
  }
  let firstInt = Number(exp[opIndex-1]);
  let secondInt = Number(exp[opIndex+1]);
  console.log('exp:', firstInt, secondInt);
  // replace expression slice with evaluation.
  const sliceResult = doTheMath(firstInt, secondInt, op);
  exp.splice(opIndex - 1, 3, sliceResult);
  return exp;
}

module.exports = solve;