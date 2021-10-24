const evaluate = (expression) => {
  // const splitExpression = expression.split(/[^0-9\.]+/g);
  const splitExpression = expression.split(/(?=[+\-/*()])|(?<=[+\-/*()])/g);
  stage(splitExpression);
}

const stage = (exp) => {
  const ops = ['*', '/', '+', '-'];
  console.log('solver log', exp);
  // multiplication > division > addition > subtraction
  for (let op of ops) {
    const opIndex = exp.indexOf(op);
    if (opIndex !== -1) {
      console.log('includes', op);
      const result = search(exp, op, opIndex)
    }
  }
  // console.log('index of *:', exp.indexOf('*'));
  // console.log('index of /:', exp.indexOf('/'));
  // console.log('index of +:', exp.indexOf('+'));
  // console.log('index of -:', exp.indexOf('-'));

}

const search = (exp, op, opIndex) => {
  let firstVal = exp[opIndex-1];
  let secondVal = exp[opIndex+1];
  return solve(firstVal, secondVal, op);

  console.log('search log:', firstVal, secondVal);
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