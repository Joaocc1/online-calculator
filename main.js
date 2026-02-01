let numOne = 2;
let numTwo = 2;
let operator = "+";

const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

function operate(a, b, op) {
  return operators[op](a, b);
}
