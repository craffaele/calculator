const evaluate = async (expression) => {
  // const splitExpression = expression.split(/[^0-9\.]+/g);
  const splitExpression = expression.split(/(?=[+\-/*()])|(?<=[+\-/*()])/g);

  // another function to check parens called here
  const evaluateParens = async (exp) => {
    console.log('eval parens called');
    let openingParen = exp.indexOf('(');
    if (openingParen === -1) return exp;

    let i = openingParen;
    let closingParen;

    while (i < exp.length) {
      console.log('loop');
      // detect opening
      if ( exp[i] === '(' ) {
        openingParen = i;
      }
      //detect closing
      if ( exp[i] === ')' ) {
        closingParen = i;
        const parenExpression = exp.slice(openingParen + 1, closingParen);
        const parenExpressionResult = await stage(parenExpression);
        exp.splice(openingParen, closingParen - openingParen + 1, parenExpressionResult);
        console.log('paren resolver exp log:', exp);
      }
      i++;
    }
  }
  const newExpression = await evaluateParens(splitExpression);
  console.log('eval parens result:', newExpression);

  const result = stage(splitExpression);
  console.log('result:', result);
}

const stage = (exp) => {
  console.log('solver log', exp);

  const ops = [['*', '/'], ['+', '-']];
  // (multiplication, division) > (addition, subtraction)
  for (let op of ops) {

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
      console.log('mutated exp:', exp);
      // reassign opIndex
      opIndex = findNextOperatorIndex(exp, exp.indexOf(op[0]), exp.indexOf(op[1]));
      // console.log('opIndex loop:', opIndex);
      currentOp = exp[opIndex];
    }
  }
  return exp[0];
}

const search = (exp, op, opIndex) => {
  let firstVal = Number(exp[opIndex-1]);
  let secondVal = Number(exp[opIndex+1]);
  // console.log('search log:', firstVal, secondVal);
  // change exp in place—-replace expression tranche with evaluation
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