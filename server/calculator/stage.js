const solve = require('./solve');

const stage = (exp, op, opIndex) => {
  let firstVal = Number(exp[opIndex-1]);
  let secondVal = Number(exp[opIndex+1]);
  // replace expression tranche with evaluation.
  const sliceResult = solve(firstVal, secondVal, op);
  exp.splice(opIndex - 1, 3, sliceResult);
  return exp;
}

module.exports = stage;