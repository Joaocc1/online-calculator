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
  "÷": (a, b) => a / b,
};

// Functions
function operate(a, b, op) {
  // first turn a and b into typeof number
  numA = Number(a);
  numB = Number(b);

  // prevent division by zero and operate if it's not the case
  if (op === "÷" && numB === 0) {
    return "No, stop that!";
  } else {
    return Math.round(operators[op](numA, numB) * 100) / 100;
  }
}

function numberEvent(eventData) {
  if (stage === "result") {
    //prevent dot input twice
    if (eventData === "." && numOne.includes(".")) {
    } else {
      numOne = eventData;
      stage = "one";
      mainDisplay.textContent = numOne;
    }
  } else if (stage === "one") {
    //prevent dot input twice
    if (eventData === "." && numOne.includes(".")) {
    } else {
      numOne += eventData;
      mainDisplay.textContent = numOne;
    }
  } else if (stage === "two" || stage === "three") {
    //prevent dot input twice
    if (eventData === "." && numTwo.includes(".")) {
    } else {
      numTwo += eventData;
      stage = "three";
      mainDisplay.textContent = `${numOne}${operator}${numTwo}`;
    }
  }
}

function operatorEvent(eventData) {
  if (eventData === "=") {
    // check if all 3 variables needed are present
    if (numOne && numTwo && operator && stage === "three") {
      secondaryDisplay.textContent = `${numOne}${operator}${numTwo}`;
      result = operate(numOne, numTwo, operator);
      numOne = result;
      numTwo = "";
      stage = "result";
      mainDisplay.textContent = result;
    }
  } else if (eventData !== "=" && stage === "three") {
    secondaryDisplay.textContent = `${numOne}${operator}${numTwo}`;
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

// Event listeners

// Click events
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

// Keyboard events
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  const isNumber = /^[0-9]$/i.test(e.key);
  const isOperator = /[\/\*\+\-]/g.test(e.key);

  if (isNumber) {
    numberEvent(e.key);
  }

  if (e.key === ".") {
    numberEvent(e.key);
  }

  if (isOperator || e.key === "Enter") {
    if (e.key === "Enter") {
      operatorEvent("=");
    } else if (e.key === "/") {
      operatorEvent("÷");
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
// Restraint number of characters and maybe find a way to shorten the chars size
