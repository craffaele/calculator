const evaluate = require('./evaluate').evaluate;

const prepare = (expression) => {
  let preparedExpression;
  preparedExpression = expression.split(/(?=[+\-/*()])|(?<=[+/*()])/g);
  console.log('prepared expression:', prepareExpression);


  evaluate(preparedExpression);
}

module.exports = prepare;