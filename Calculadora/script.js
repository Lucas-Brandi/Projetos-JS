
let display = document.getElementById("display");
let currentInput = "";
let previousInput = "";
let operator = "";

function updateDisplay(value) {
    display.textContent = value;
}

function appendNumber(number) {
    if (currentInput.length < 10) {
        currentInput += number;
        updateDisplay(previousInput + " " + operator + " " + currentInput);
    }
}


function chooseOperator(selectedOperator) {
    if (currentInput === "") return;
    if (previousInput !== "") {
        calculate();
    }
    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = "";
    updateDisplay(previousInput + " " + operator);
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "x":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result;
    operator = "";
    previousInput = "";
    updateDisplay(currentInput);
}

function clearAll() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("");
}

function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay(previousInput + " " + operator + " " + currentInput);
}

function appendDecimal() {
    if (currentInput.includes(".")) return;
    currentInput += ".";
    updateDisplay(previousInput + " " + operator + " " + currentInput);
}

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        if (!isNaN(value)) {
            appendNumber(value);
        } else if (value === "C") {
            clearAll();
        } else if (value === "=") {
            calculate();
        } else if (value === ".") {
            appendDecimal();
        } else if (value === "←") {
            deleteLast();
        } else {
            chooseOperator(value);
        }
    });
});
