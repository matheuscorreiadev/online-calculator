let display = document.getElementById('display');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Usamos uma abordagem de substituir os operadores por funções matemáticas
        let expression = display.value;
        expression = expression.replace(/x/g, '*').replace(/÷/g, '/');  // Substitui para os operadores padrão
        let result = evaluateExpression(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Erro';
    }
}

function evaluateExpression(expression) {
    // Aqui estamos fazendo uma implementação manual de cálculos
    const operators = ['+', '-', '*', '/'];

    let numbers = expression.split(/[\+\-\*\/]/).map(num => parseFloat(num));
    let operatorsInExpression = expression.match(/[\+\-\*\/]/g);

    if (operatorsInExpression) {
        // Calcula multiplicações e divisões primeiro
        for (let i = 0; i < operatorsInExpression.length; i++) {
            if (operatorsInExpression[i] === '*' || operatorsInExpression[i] === '/') {
                let result = operatorsInExpression[i] === '*' 
                    ? numbers[i] * numbers[i + 1] 
                    : numbers[i] / numbers[i + 1];
                numbers[i] = result;
                numbers.splice(i + 1, 1);
                operatorsInExpression.splice(i, 1);
                i--;
            }
        }

        // Depois, soma e subtrai
        let total = numbers[0];
        for (let i = 0; i < operatorsInExpression.length; i++) {
            if (operatorsInExpression[i] === '+') {
                total += numbers[i + 1];
            } else if (operatorsInExpression[i] === '-') {
                total -= numbers[i + 1];
            }
        }

        return total;
    } else {
        return numbers[0]; // Retorna o número se não houver operadores
    }
}
