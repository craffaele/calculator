const solve = (exp, op, opIndex) => {

  const doTheMath = (firstVal, secondVal, operator) => {
    switch(operator) {
      case '*' : return firstVal * secondVal;
      case '/' : return firstVal / secondVal;
      case '+' : return firstVal + secondVal;
      case '-' : return firstVal - secondVal;
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