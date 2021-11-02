const axios = require('axios');
const format = require('./server/calculator/format');

const expressions = [
  '1+2',
  '4*5/2',
  '-5+-8--11*2',
  '-.32/.5',
  '(4-2)*3.5',
  '9(9)'
]
const results = [3, 10, 9, -0.64, 7, 81];

describe ('basic expressions', () => {
  it ('should solve basic math expressions', () => {
    expressions.forEach((exp, i) => {
      expect(format(exp)).toBe(results[i]);
    });
  });
});

describe ('parens', () => {
  it ('should handle nested parens', () => {
    expect(format('((((((7)))))3)')).toBe(21);
    expect(format('((((((((((((((((16+2))))))))))))))))')).toBe(18);
  });

  it ('should multiply adjacent paren expressions', () => {
    expect(format('(3)(3)')).toBe(9);
    expect(format('(3)3')).toBe(9);
  });

  it ('should catch unbalanced parens', () => {
    expect(format('((3+3)-(64)))')).toBe('Parens not balanced.')
    expect(format('(97/((34)')).toBe('Parens not balanced.')
  });

  it ('should handle double minus just before parens', () => {
    expect(format('50--(25+25)')).toBe(100);
  });
});

describe ('floats', () => {
  it ('should handle floats with precision', () => {
    expect(format('0.1+0.2')).toBe(0.3);
  });
});

describe ('invalid inputs', () => {
  it ('should return NaN for invalid/ broken inputs', () => {
    expect(format('12+)34-')).toBe(NaN);
    expect(format('20+(23-)')).toBe(NaN);
  });
});





