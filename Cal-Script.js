let display = document.getElementById('display');
let currentInput = '';
let result = null;
let resetInput = false;

function addToDisplay(value) {
    if (resetInput) {
        currentInput = '';
        resetInput = false;
    }

    if (currentInput === '0' && value !== '.') {
        currentInput = '';
    }
    currentInput += value;
    display.textContent = currentInput;
}

function calculate() {
    try {
        result = eval(currentInput);
        if (result === undefined) {
            throw new Error('Invalid calculation');
        }
        display.textContent = result;
        currentInput = result.toString();
        resetInput = true;
    } catch (error) {
        display.textContent = 'Error';
        currentInput = '';
    }
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = '';
    result = null;
    display.textContent = '0';
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        addToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// Add event listeners to the buttons
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        if (!isNaN(buttonText) || ['+', '-', '*', '/', '.', '%'].includes(buttonText)) {
            addToDisplay(buttonText);
        } else if (buttonText === '=') {
            calculate();
        } else if (buttonText === 'C') {
            clearDisplay();
        } else if (buttonText === '←') {
            backspace();
        }
    });
});