const keyboard = document.querySelector(".keyboard");
const mainDisplay = document.querySelector(".main-display");
const secondaryDisplay = document.querySelector(".secondary-display");

let numOne = "";
let numTwo = "";
let operator = "";

let updateVar = "num-one";

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
    numOne += e.target.textContent;
    mainDisplay.textContent = numOne;
  } else if (e.target.matches(".clear")) {
    numOne = numTwo = operator = "";
    mainDisplay.textContent = 0;
    secondaryDisplay.textContent = "";
  } else if (e.target.matches(".del")) {
    numOne = numOne.slice(0, -1);
    mainDisplay.textContent = numOne;
  }
});
