// since our client restricts entry of all but two invalid inputs, unbalanced parens and hanging
// operators, we only need to check parens here. additional checkers for future versions of this application,
// particularly one that supports command line submission, will live in this file and very likely check things
// like decimals and successive operators. hanging operators are otherwise found and errored during
// the server's attempt to evaluate.

const checkBalancedParens = function(input, firstIndex) {
  let parenStack = [];
  for (let i = firstIndex; i < input.length; i++) {
    let current = input[i];
    if (current === '(') {
      parenStack.push(current);
    } else if (current === ')') {
      if (parenStack.length === 0) {
        return false;
      }
      parenStack.pop();
    }
  }
  return parenStack.length > 0 ? false : true;
};

module.exports.checkBalancedParens = checkBalancedParens;