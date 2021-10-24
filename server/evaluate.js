const evaluate = (expression) => {
  // const splitExpression = expression.split(/[^0-9\.]+/g);
  const splitExpression = expression.split(/(?=[+\-/*()])|(?<=[+\-/*()])/g);
  const result = stage(splitExpression);
  console.log('result:', result);
}

const stage = (exp) => {
  console.log('solver log', exp);
  const ops = ['*', '/', '+', '-'];
  // multiplication > division > addition > subtraction
  for (let op of ops) {
    let opIndex = exp.indexOf(op);
    while (opIndex !== -1) {
      console.log('includes', op);
      exp = search(exp, op, opIndex);
      opIndex = exp.indexOf(op);
      console.log('mutated exp:', exp);
      // reassign opIndex
      opIndex = exp.indexOf(op, opIndex);
    }
  }
  return exp[0];

}

const search = (exp, op, opIndex) => {
  let firstVal = Number(exp[opIndex-1]);
  let secondVal = Number(exp[opIndex+1]);
  // console.log('search log:', firstVal, secondVal);
  // change exp in place—-replace expression tranche with eval
  const trancheResult = solve(firstVal, secondVal, op);
  exp.splice(opIndex - 1, 3, trancheResult);
  return exp;

}

const solve = (firstVal, secondVal, op) => {
  switch(op) {
    case '*' : return firstVal * secondVal;
    case '/' : return firstVal / secondVal;
    case '+' : return firstVal + secondVal;
    case '-' : return firstVal - secondVal;
  }
}

module.exports.evaluate = evaluate;