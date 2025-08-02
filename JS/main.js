// modal  
const modal = document.querySelector('#modal-window')
const modalCloseBtn = document.querySelector('#modal-close')

modalCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none'
});


// Calculator 

const currentDisplay = document.querySelector('#displayEntering')
const displayAnswer = document.querySelector('#displayAnswer')
const buttons = document.querySelectorAll('.btn')

let previousValue = ''
let operation = undefined

function calculate() {
    let result

    const prev = parseFloat(previousValue)
    const current = parseFloat(currentDisplay.value)

    if(isNaN(prev) || isNaN(current)) {
        return
    }

    switch(operation) {
        case '+': 
          result = prev + current
        break

        case '-': 
          result = prev - current
        break

        case 'x': 
          result = prev * current
        break

        case '÷': 
          result = prev / current
        break

        case '%': 
          result = prev(prev / 100) * current
        break
    }
    displayAnswer.value = result
    previousValue = ''
}

function updateDisplay(value) {
    if(value === '.' && currentDisplay.value.includes('.')) {
        return
    }
    if(currentDisplay.value.length >=15) {
        return
    }
    if(currentDisplay.value === '0' && value !== '.') {
        currentDisplay.value = value
    } else {
        currentDisplay.value += value
    }
}

function clearDisplay() {
    currentDisplay.value = ''
    displayAnswer.value = ''
    previousValue = ''
    operation = undefined
}

function chooseOperation(op) {
    if(currentDisplay.value === '') {
        return
    }
    if(previousValue !== '') {
        calculate()
    }
    operation = op
    previousValue = currentDisplay.value
    currentDisplay.value = ''
}

function deleteLast() {
    currentDisplay.value =currentDisplay.value.toString().slice(0, -1)
}

buttons.forEach(function(button) {
    button.addEventListener('click', () => {
        const buttonText = button.innerText
        if(!isNaN(buttonText) || buttonText === '.') {
            updateDisplay(buttonText)
        } else if(['+', '-', 'x', '÷', '%'].includes(buttonText)) {
            chooseOperation(buttonText)
        } else if(buttonText === '=') {
            calculate()
        } else if(buttonText === 'C') {
            clearDisplay()
        } else if(buttonText === '⌫') {
            deleteLast()
        } else if(buttonText === '00') {
            updateDisplay(buttonText)
        }
    })
})