const solve = (firstVal, secondVal, operator) => {
  switch(operator) {
    case '*' : return firstVal * secondVal;
    case '/' : return firstVal / secondVal;
    case '+' : return firstVal + secondVal;
    case '-' : return firstVal - secondVal;
  }
}

module.exports = solve;