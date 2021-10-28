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

describe ('basic expressions', () => {
  it ('should solve basic math expressions', () => {
    expressions.forEach((exp, i) => {
      expect(ratify(exp)).toBe(results[i]);
    });
  });
});

describe ('parens', () => {
  it ('should handle nested parens', () => {
    expect(ratify('((((((7)))))3)')).toBe(21);
    expect(ratify('((((((((((((((((16+2))))))))))))))))')).toBe(18);
  });

  it ('should multiply adjacent paren expressions', () => {
    expect(ratify('(3)(3)')).toBe(9);
    expect(ratify('(3)3')).toBe(9);
  });

  it ('should catch unbalanced parens', () => {
    expect(ratify('((3+3)-(64)))')).toBe('Parens not balanced.')
    expect(ratify('(97/((34)')).toBe('Parens not balanced.')
  });
});

describe ('parens', () => {
  it ('should handle nested parens', () => {
    expect(ratify('((((((7)))))3)')).toBe(21);
    expect(ratify('((((((((((((((((16+2))))))))))))))))')).toBe(18);
  });

  it ('should multiply adjacent paren expressions', () => {
    expect(ratify('(3)(3)')).toBe(9);
    expect(ratify('(3)3')).toBe(9);
  });

  it ('should catch unbalanced parens', () => {
    expect(ratify('((3+3)-(64)))')).toBe('Parens not balanced.')
    expect(ratify('(97/((34)')).toBe('Parens not balanced.')
  });
});


describe ('floats', () => {
  it ('should handle floats with precision', () => {
    expect(ratify('0.1+0.2')).toBe(0.3);
  });
});





