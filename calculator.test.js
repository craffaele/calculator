const axios = require('axios');
const ratify = require('./server/calculator/ratify');

const expressions = [
  '1+2',
  '4*5/2',
  '-5+-8--11*2',
  '-.32/.5',
  '(4-2)*3.5',
  '9(9)'
]
const results = [3, 10, 9, -0.64, 7, 81];

describe ('', () => {
  it ('solves example operations', () => {
    expressions.forEach((exp, i) => {
      expect(ratify(exp)).toBe(results[i]);
    });
  });
});


