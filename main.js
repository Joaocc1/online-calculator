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

let stage = "one"; // to check which stage the calculator is at (one, two, three, result)

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

  // prevent division by zero and operate if it's not the case
  if (op === "/" && numB === 0) {
    return "No, stop that!";
  } else {
    return Math.round(operators[op](numA, numB) * 100) / 100;
  }
}

function numberEvent(eventData) {
  if (stage === "result") {
    numOne = eventData;
    mainDisplay.textContent = numOne;
  } else if (stage === "one") {
    numOne += eventData;
    mainDisplay.textContent = numOne;
  } else if (stage === "two" || stage === "three") {
    numTwo += eventData;
    stage = "three";
    mainDisplay.textContent = `${numOne}${operator}${numTwo}`;
  }
}

function operatorEvent(eventData) {
  if (eventData === "=") {
    // check if all 3 variables needed are present
    if (numOne && numTwo && operator && stage === "three") {
      result = operate(numOne, numTwo, operator);
      numOne = result;
      numTwo = "";
      stage = "result";
      mainDisplay.textContent = result;
    }
  } else if (eventData !== "=" && stage === "three") {
    result = operate(numOne, numTwo, operator);
    numOne = result;
    numTwo = "";
    stage = "two";
    operator = eventData;
    mainDisplay.textContent = `${result}${operator}`;
  } else if (
    (eventData !== "=" && numOne !== "" && stage === "one") ||
    stage === "result"
  ) {
    operator = eventData;
    stage = "two";
    mainDisplay.textContent = `${numOne}${operator}`;
  }
}

function clearEvent() {
  numOne = numTwo = operator = "";
  mainDisplay.textContent = "";
  secondaryDisplay.textContent = "";
  stage = "one";
}

function deleteEvent() {
  if (stage === "one") {
    if (numOne.length === 0 || numOne === "") {
      numOne = "";
    } else {
      numOne = numOne.toString().slice(0, -1);
      mainDisplay.textContent = numOne;
    }
  }

  if (stage === "two") {
    operator = "";
    stage = "one";
    mainDisplay.textContent = numOne;
  }

  if (stage === "three") {
    numTwo = numTwo.slice(0, -1);
    mainDisplay.textContent = `${numOne}${operator}${numTwo}`;
  }
}

numberKeys.forEach((key) => {
  key.addEventListener("click", (e) => numberEvent(e.target.textContent));
});

operatorKeys.forEach((key) => {
  key.addEventListener("click", (e) => operatorEvent(e.target.textContent));
});

eraseKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target.matches(".clear")) {
      clearEvent();
    } else if (
      e.target.matches(".del") ||
      e.target.matches(".del-icon") ||
      e.target.matches(".svg")
    ) {
      console.log(e.target);
      deleteEvent();
    }
  });
});

document.addEventListener("keydown", (e) => {
  const isNumber = /^[0-9]$/i.test(e.key);
  const isOperator = /[\/\*\+\-]/g.test(e.key);

  if (isNumber) {
    numberEvent(e.key);
  }

  if (isOperator || e.key === "Enter") {
    if (e.key === "Enter") {
      operatorEvent("=");
    } else {
      operatorEvent(e.key);
    }
  }

  if (e.key === "Delete") {
    clearEvent();
  }

  if (e.key === "Backspace") {
    deleteEvent();
  }
});

// to do:
//
// Extra credit

// Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though, like: 12.3.56.5. Disable the . button if there’s already a decimal separator in the display.
