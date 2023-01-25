function main () {
function appendToDisplay(num) {
    let display = document.getElementsByClassName("input");
    display.value += num;
  }

  let buttons = document.querySelectorAll("button")

  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i]
    button.addEventListener("click", function() {
        let buttonText = this.textContent
        appendToDisplay(buttonText)
    })
  }

  let lastValue = '';

  function appendToDisplay(value) {
      let input = document.querySelector(".input");
      switch (value) {
          case "Del":
              input.value = input.value.slice(0, -1);
              lastValue = input.value[input.value.length - 1];
              break;
          case "C":
              input.value = "";
              lastValue = '';
              break;
          case "=":
              input.value = calculate(input.value);
              lastValue = input.value[input.value.length - 1];
              break;
          case "(":
          case ")":
              input.value += value;
              lastValue = value;
              break;
          default:
              if (lastValue.match(/[\+\-\*\/\%]/) && value.match(/[\+\-\*\/\%]/)) {
                  return;
              }
              input.value += value;
              lastValue = value;
      }
  }
  

  function calculate(equation) {

    while (equation.match(/\([^\(\)]+\)/)) {

      let sub = equation.match(/\([^\(\)]+\)/)[0];

      sub = sub.slice(1, -1);

      let subResult = calculate(sub);

      equation = equation.replace(/\([^\(\)]+\)/, subResult);
    }

    let numbers = equation.split(/[\+\-\*\/\%]/);
    let operator = equation.match(/[\+\-\*\/\%]/)[0];
    let num1 = parseFloat(numbers[0]);
    let num2 = parseFloat(numbers[1]);

    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      case "%":
        return num1 % num2;
    }
  }
}


main()