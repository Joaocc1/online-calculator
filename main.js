const keyboard = document.querySelector(".keyboard");
const mainDisplay = document.querySelector(".main-display");

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

keyboard.addEventListener("click", (e) => {
  if (e.target.matches(".key")) {
    mainDisplay.textContent = mainDisplay.textContent + e.target.textContent;
  }
});
