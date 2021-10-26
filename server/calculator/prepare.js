const evaluate = require('./evaluate').evaluate;

const prepare = (expression) => {

 const splitExpression = expression.split(/(?=[+\-/*()])|(?<=[+/*()])/g);
  console.log('prepared expression:', splitExpression);
  // insert '-' between any two integers wihtout operators between them.
  let formattedExpression = [];
  for (let i =0; i< splitExpression.length; i++) {
    let currentItem = splitExpression[i];
    let nextItem = splitExpression[i + 1];
    console.log('item:', currentItem);
    formattedExpression.push(currentItem);
    if (!isNaN(Number(currentItem)) && !isNaN(Number(nextItem))) {
      console.log('test')
     formattedExpression.push('+');
    }
  }
  console.log('formatted expression:', formattedExpression);


  return evaluate(formattedExpression);
}

module.exports = prepare;