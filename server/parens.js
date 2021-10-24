const evaluateParens = (firstOpenIndex, exp) => {
  let openParenIndex;

  for (let i = firstOpenIndex; i < exp.length; i++) {
    let current = exp[i];
    console.log('paren loop log:', exp[i]);
    if (current === '(' ) {
      openParenIndex = i;
    } else if (current === ')') {
      exp.splice(openParenIndex, i - openParenIndex + 1, 20);
      console.log(exp);
    }
  }
}
const result = evaluateParens(2, ['10', '+', '(', '10', '+', '10', ')']);
console.log('result:', result);