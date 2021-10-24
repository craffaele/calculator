const evaluate = (expression) => {
  // const splitExpression = expression.split(/[^0-9\.]+/g);
  const splitExpression = expression.split(/(?=[+\-/*()])|(?<=[+\-/*()])/g);
  const result = stage(splitExpression);
  console.log('result:', result);
}

const stage = (exp) => {
  console.log('solver log', exp);

  const ops = [['*', '/'], ['+', '-']];
  // (multiplication, division) > (addition, subtraction)
  for (let op of ops) {
    console.log('current op set:', op);
    // let firstIndex = exp.indexOf(op[0]);
    // let secondIndex = exp.indexOf(op[1]);
    // console.log('first index:', firstIndex);
    // console.log('second index:', secondIndex);

    const findNextOperatorIndex = (exp, firstIndex, secondIndex) => {
      if (firstIndex === secondIndex) {
        console.log('they are both -1');
        return -1;
      } else if (firstIndex === -1 || secondIndex === -1) {
        console.log('whichever is greater.')
        return Math.max( exp.indexOf(op[0]), exp.indexOf(op[1]) );
      } else {
        console.log('whichever is less.')
        return Math.min( exp.indexOf(op[0]), exp.indexOf(op[1]) );
      }
    }
    let opIndex = findNextOperatorIndex(exp, exp.indexOf(op[0]), exp.indexOf(op[1]));
    // let opIndex = Math.min( exp.indexOf(op[0]), exp.indexOf(op[1]) );
    console.log('opIndex:', opIndex);

    let currentOp = exp[opIndex];
    console.log('currentOp:', currentOp);

    while (opIndex !== -1) {
      console.log('LOOP RUNS')
      exp = search(exp, currentOp, opIndex);
      // opIndex = Math.max( exp.indexOf(op[0]), exp.indexOf(op[1]) );
      // findNextOperator(exp);
      console.log('mutated exp:', exp);
      // reassign opIndex
      // opIndex = Math.min( exp.indexOf(op[0]), exp.indexOf(op[1]) );
      opIndex = findNextOperatorIndex(exp, exp.indexOf(op[0]), exp.indexOf(op[1]));
      console.log('opIndex loop:', opIndex)
      currentOp = exp[opIndex];
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