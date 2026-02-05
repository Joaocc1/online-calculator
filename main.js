const keyboard = document.querySelector(".keyboard");
const mainDisplay = document.querySelector(".main-display");
const secondaryDisplay = document.querySelector(".secondary-display");

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
  if (
    e.target.matches(".key") &&
    !e.target.matches(".clear") &&
    !e.target.matches(".del")
  ) {
    numOne = e.target.textContent;
    mainDisplay.textContent = mainDisplay.textContent + e.target.textContent;
  } else if (e.target.matches(".clear")) {
    numOne = numTwo = operator = "";
    mainDisplay.textContent = 0;
    secondaryDisplay.textContent = "";
  } else if (e.target.matches(".del")) {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
  }
});
