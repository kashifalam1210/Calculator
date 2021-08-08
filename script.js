var buttons = document.getElementsByTagName("a");
var operators = ["+", "-", "x", "÷", "%"];
var decimalAdded = false;
var resultDisplayed = false;

// Add onclick event to all the buttons and perform operations
for (var i = 0; i < buttons.length; i++) {
	buttons[i].onclick = function (calculate) {
		// Get the input and button values
		var input = document.getElementById("total");
		var inputValue = input.innerHTML;
		var buttonVal = this.innerHTML;

		// if the clear button is pressed, erase everything
		if (buttonVal == 'C') {
			inputValue = " ";
			input.innerHTML = inputValue;
			decimalAdded = false;
		}
        // if the clear last entry button is pressed, erase the last character
		else if (buttonVal == 'CE') {
            inputValue = inputValue.substring(0, inputValue.length - 1);
			input.innerHTML = inputValue;
			//check to see if any decimals in the inputValue, so that no new decimals can be added after the inital decimal is added when the CE button is pressed
			if (inputValue.indexOf(".") !== -1) {
				decimalAdded = true;
			}
			else {
				decimalAdded = false;
			}
		}

		// if the equal button is pressed, calculate the equation and display the result
		else if (buttonVal == '=') {
			var equation = inputValue;
			var lastChar = equation[equation.length - 1];
			// checks the last character of the equation. 
			if (operators.indexOf(lastChar) > -1 || lastChar == '.')
				//if it's an operator or a decimal, remove it
				equation = equation.replace(/.$/, '');
			// the equation is executed and the resultDisplayed is reset
			if (equation) {
				input.innerHTML = eval(equation);
				resultDisplayed = true;
			}
			decimalAdded = false;

		}
		else if (operators.indexOf(buttonVal) > -1) {
			// gets the last character from the equation
			var lastChar = inputValue[inputValue.length - 1];

			//  adds the operator only if input is not empty and there is no operator at the last characer
			if (inputValue != '' && operators.indexOf(lastChar) == -1)
				input.innerHTML += buttonVal;

			// allows minus if the string is empty
			else if (inputValue == '' && buttonVal == '-')
				input.innerHTML += buttonVal;

			// replaces the last operator (if it exists) with a new operator
			if (operators.indexOf(lastChar) > -1 && inputValue.length > 1) {
				//'.' matches any character, while $ equals the end of string, any operator at the end of string will get replaced by a new operator
				input.innerHTML = inputValue.replace(/.$/, buttonVal);
			}

			decimalAdded = false;
		}
		//prevents more decimals to be added to the inputValue.  It is set when the user presses the . button
		else if (buttonVal === '.') {
			if (!decimalAdded) {
				input.innerHTML += buttonVal;
				decimalAdded = true;
			}
		}

		// prevents the addition of numbers after the equal sign has been set.  
		else {
			if (resultDisplayed === true) {
				input.innerHTML = " ";
				decimalAdded = false;
				resultDisplayed = false;

			}
			//if any other button than a number button is pressed, this appends it to the input.innerHTML
			input.innerHTML += buttonVal;
		}


		// prevents page jumps
		calculate.preventDefault();
	}
}