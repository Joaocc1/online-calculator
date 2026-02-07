const keyboard = document.querySelector(".keyboard");
const mainDisplay = document.querySelector(".main-display");
const secondaryDisplay = document.querySelector(".secondary-display");
const numberKeys = document.querySelectorAll(".num");
const operatorKeys = document.querySelectorAll(".operator");
const eraseKeys = document.querySelectorAll(".erase");

let numOne = "";
let numTwo = "";
let operator = "";
let result = "";

let updateVar = "num-one"; // to check which variable to update once a number is pressed

const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

function operate(a, b, op) {
  // first turn a and b into typeof number
  numA = Number(a);
  numB = Number(b);
  return operators[op](numA, numB);
}

numberKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    if (updateVar === "num-one") {
      numOne += e.target.textContent;
      mainDisplay.textContent = numOne;
    } else if (updateVar === "num-two") {
      numTwo += e.target.textContent;
      mainDisplay.textContent = `${numOne}${operator}${numTwo}`;
    }
  });
});

operatorKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    console.log(updateVar);
    if (e.target.textContent === "=") {
      // check if all 3 variables needed are present
      if (numOne && numTwo && operator) {
        result = operate(numOne, numTwo, operator);
        numOne = result;
        numTwo = "";
        mainDisplay.textContent = result;
      }
    } else if (e.target.textContent !== "=" && updateVar === "num-two") {
      result = operate(numOne, numTwo, operator);
      numOne = result;
      numTwo = "";
      operator = e.target.textContent;
      mainDisplay.textContent = `${result}${operator}`;
    }

    if (e.target.textContent !== "=" && updateVar === "num-one") {
      operator = e.target.textContent;
      updateVar = "num-two";
      mainDisplay.textContent = `${numOne}${operator}`;
    }
  });
});

eraseKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    if (e.target.matches(".clear")) {
      numOne = numTwo = operator = "";
      mainDisplay.textContent = "";
      secondaryDisplay.textContent = "";
      updateVar = "num-one";
    } else if (e.target.matches(".del")) {
      numOne = numOne.slice(0, -1);
      mainDisplay.textContent = numOne;
    }
  });
});

// keyboard.addEventListener("click", (e) => {
//   if (
//     e.target.matches(".key") &&
//     !e.target.matches(".clear") &&
//     !e.target.matches(".del")
//   ) {
//     numOne += e.target.textContent;
//     mainDisplay.textContent = numOne;
//   } else if (e.target.matches(".clear")) {
//     numOne = numTwo = operator = "";
//     mainDisplay.textContent = 0;
//     secondaryDisplay.textContent = "";
//   } else if (e.target.matches(".del")) {
//     numOne = numOne.slice(0, -1);
//     mainDisplay.textContent = numOne;
//   }
// });

// to do:
// Comment out the whole addEventListener above, create one for just the numbers (add a class of num in index.html)
// Create the logic to update numOne and if an operator, a + for example is pressed, update the operator e move on to update the numTwo. If another operator or the = sign is press run operate()
// Create an addEventListener for operators, when one is pressed update operator variable, change the updateVar to numTwo and display numOne + operator
// add logic to check updateVar to know what variable to update, numOne or numTwo, and display that
