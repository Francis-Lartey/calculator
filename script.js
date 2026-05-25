class Calculator {
    constructor(displayElement) {
        this.display = displayElement;
        this.clear();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.textContent = this.currentValue;
    }

    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentValue = number;
            this.shouldResetDisplay = false;
        } else {
            if (this.currentValue === '0' && number !== '.') {
                this.currentValue = number;
            } else if (number === '.' && this.currentValue.includes('.')) {
                return;
            } else {
                this.currentValue += number;
            }
        }
        this.updateDisplay();
    }

    setOperation(nextOperation) {
        if (this.currentValue === '') return;

        if (this.previousValue !== '') {
            this.calculate();
        }

        this.previousValue = this.currentValue;
        this.operation = nextOperation;
        this.shouldResetDisplay = true;
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '−':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default:
                return;
        }

        this.currentValue = result.toString();
        this.operation = null;
        this.previousValue = '';
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    delete() {
        if (this.shouldResetDisplay) return;
        this.currentValue = this.currentValue.toString().slice(0, -1) || '0';
        this.updateDisplay();
    }
}

// Initialize calculator
const displayElement = document.querySelector('.display');
const calculator = new Calculator(displayElement);

// Event listeners for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (button.classList.contains('number')) {
            calculator.appendNumber(buttonText);
        } else if (button.classList.contains('operator')) {
            calculator.setOperation(buttonText);
        } else if (button.classList.contains('equals')) {
            calculator.calculate();
        } else if (button.classList.contains('clear')) {
            calculator.clear();
        } else if (button.classList.contains('delete')) {
            calculator.delete();
        }
    });
});