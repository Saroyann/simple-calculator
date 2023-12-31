'use strict';
// Select all number buttons, operation buttons, delete button, clear button, equals button, and text elements for previous and current operands.
const numbersButton = document.querySelectorAll('.numbers');
const operationButton = document.querySelectorAll('.operations');
const deleteButton = document.querySelector('.delete2');
const clearAllButton = document.querySelector('.all-clear')
const equalsButton = document.querySelector('.equals');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand')

// Define the Calculator class to manage calculator operations.
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

      // Reset operands and operation to initial values.
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Delete one character from the current operand and update the display.
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        this.updateDisplay();
    }

    // Append a number to the current operand, checking for the presence of a decimal point.
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand + number;
    }

    // Choose a mathematical operation and trigger computation if a previous operation exists.
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // Perform computation between previous and current operands based on the chosen operation.
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    // Format the number display appropriately.
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const parts = stringNumber.split('.');
        const integerDigits = parseFloat(parts[0]);
        const decimalDigits = parts[1];

        let integerDisplay = isNaN(integerDigits) ? '' : integerDigits.toLocaleString();

        return decimalDigits != null ? `${integerDisplay}.${decimalDigits}` : integerDisplay;
    }

    // Update the display of the current and previous operands.
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        this.previousOperandTextElement.innerText = this.operation !== undefined ? `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` : '';
    }

}

// Create an instance of the Calculator class with the previous and current operand text elements as arguments.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add event listeners for number buttons.
numbersButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

// Add event listeners for operation buttons.
operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

// Add event listeners for equals buttons.
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

// Add event listeners for all clear buttons.
clearAllButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

// Add event listeners for delete buttons.
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
