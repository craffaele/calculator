const solve = require('./solve');

const stage = (exp, op, opIndex) => {
  let firstInt = Number(exp[opIndex-1]);
  let secondInt = Number(exp[opIndex+1]);
  // replace expression tranche with evaluation.
  const sliceResult = solve(firstInt, secondInt, op);
  exp.splice(opIndex - 1, 3, sliceResult);
  return exp;
}

module.exports = stage;