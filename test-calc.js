const calculator = {
	displayValue: "0",
	firstNum: null,
	secondNum: null,
	checkForSecondNum: false,
	operator: null,
	calculated: false
};

function update() {
	const display = document.querySelector("#displaynum");
	//sets the calc obj property displayValue to a maxlength
	calculator.displayValue = String(calculator.displayValue).substring(0, 16);
	display.innerHTML = calculator.displayValue;

	if (calculator.displayValue.length >= 15) {
		display.style.fontSize = "24px";
		display.innerHTML = calculator.displayValue.substring(0, 16);
		return;
	} else if (calculator.displayValue.length < 15) {
		display.style.fontSize = "32px";
	}
}
update();

const allButtons = document.querySelector(".calcbtns");
//Adds a click event listener to all .calcbtn children
allButtons.addEventListener("click", function (e) {
	const pressed = e.target; //button clicked

	//does not contain btn class
    if (!pressed.classList.contains("btn")) {
    	return; 
    } 

    if (pressed.classList.contains("operator")) {
    	signs(pressed.value);
    	update();
    	return;
    }

    if (pressed.classList.contains("decimal")) {
    	addDecimal(pressed.value);
    	update();
    	return;
    }

    if (pressed.classList.contains("clear")) {
    	clear();
    	update();
    	return;
    }

    if (pressed.classList.contains("equals")) {
    	equals(pressed.value);
    	update();
    	return;
    }

    if (pressed.classList.contains("num")) {
    	showDigit(pressed.value);
    	update();
    	return;
    }

    if (pressed.classList.contains("backspace")) {
    	backspace(pressed.value);
    	update();
    	return;
    }

    if (pressed.classList.contains("sqrt")) {
    	squareroot();
    	update();
    }

});

function showDigit(digit) {
	const displayValue = calculator.displayValue;

	if (calculator.checkForSecondNum === true) {

		if (displayValue.includes("+")) {
			calculator.secondNum = displayValue.split("+")[1]; //numbers afer sign
		}

		if (displayValue.includes("-")) {
			calculator.secondNum = displayValue.split("-")[1]; //numbers afer sign
		}

		if (displayValue.includes("*")) {
			calculator.secondNum = displayValue.split("*")[1]; //numbers afer sign
		}

		if (displayValue.includes("÷")) {
			calculator.secondNum = displayValue.split("÷")[1]; //numbers afer sign
		}
	}
	//If the display is 0, display the pressed number instead, other append the next number
	if (displayValue === "0") {
		calculator.displayValue = digit;
		calculator.firstNum = digit;
	} else {
		calculator.displayValue = displayValue + digit;
		calculator.firstNum = calculator.firstNum + digit;
	}
} 

function addDecimal(decimal) {
	displayValue = calculator.displayValue;
	secondNum = calculator.secondNum;

	//If there isn't a decimal in displayValue, add one & store in firstNum property of calc obj
	if(!displayValue.includes(decimal)) {
		calculator.displayValue = displayValue += decimal;
		calculator.firstNum = displayValue += decimal;
		return;
		}

	if(secondNum.includes(decimal)) {
		return;
	}

	//If there is a decimal in the firstNum, append decimal to secondNum
	if (calculator.checkForSecondNum === true) {

		if (displayValue.includes("+")) {
			calculator.secondNum = displayValue.split("+")[1] += decimal; //numbers afer sign
		}

		if (displayValue.includes("-")) {
			calculator.secondNum = displayValue.split("-")[1] += decimal; //numbers afer sign
		}

		if (displayValue.includes("*")) {
			calculator.secondNum = displayValue.split("*")[1] += decimal; //numbers afer sign
		}

		if (displayValue.includes("÷")) {
			calculator.secondNum = displayValue.split("÷")[1] += decimal; //numbers afer sign
		}

		calculator.displayValue = displayValue += decimal;
		//calculator.secondNum = displayValue.substring(0, displayValue.indexOf(".")); //numbers before sign
		calculator.secondNum = displayValue += decimal;
	}

}

function signs(operator) {
	displayValue = calculator.displayValue; 

	//Check if displayValue contains an operation sign
	if(displayValue.includes("+") || 
	    displayValue.includes("-") ||
	    displayValue.includes("*") ||
	    displayValue.includes("÷")) {
		return;
	} else {
		calculator.displayValue = displayValue += operator;
		calculator.operator = operator;
		calculator.checkForSecondNum = true;
	}
}

function equals() {
	displayValue = String(calculator.displayValue);

	if (displayValue.includes("+")) {
		calculator.firstNum = displayValue.substring(0, displayValue.indexOf("+")); //numbers before sign
		calculator.secondNum = displayValue.split("+")[1]; //numbers afer sign
		answer = parseFloat(calculator.firstNum) + parseFloat(calculator.secondNum); //converts to numbers and evaluates
		calculator.displayValue = answer;
		calculator.checkForSecondNum = false;
		return;
	}

	if (displayValue.includes("-")) {
		calculator.firstNum = displayValue.substring(0, displayValue.indexOf("-")); //numbers before sign
		calculator.secondNum = displayValue.split("-")[1]; //numbers afer sign
		answer = parseFloat(calculator.firstNum) - parseFloat(calculator.secondNum); //converts to numbers and evaluates
		calculator.displayValue = answer;
		calculator.checkForSecondNum = false;
		return;
	}

	if (displayValue.includes("*")) {
		calculator.firstNum = displayValue.substring(0, displayValue.indexOf("*")); //numbers before sign
		calculator.secondNum = displayValue.split("*")[1]; //numbers afer sign
		answer = parseFloat(calculator.firstNum) * parseFloat(calculator.secondNum); //converts to numbers and evaluates
		calculator.displayValue = answer;
		calculator.checkForSecondNum = false;
		return;
	}

	if (displayValue.includes("÷")) {
		calculator.firstNum = displayValue.substring(0, displayValue.indexOf("÷")); //numbers before sign
		calculator.secondNum = displayValue.split("÷")[1]; //numbers afer sign
		answer = parseFloat(calculator.firstNum) / parseFloat(calculator.secondNum); //converts to numbers and evaluates
		calculator.displayValue = answer;
		calculator.checkForSecondNum = false;
		return;
	}
}

function squareroot() {
	let square = Math.sqrt(calculator.displayValue);
	calculator.displayValue = square;
}

//Sets all values of calculator object to 0 or false, clearing display
function clear() {
	calculator.displayValue = "0";
	calculator.firstNum = "0";
	calculator.secondNum = "0";
	calculator.checkForSecondNum = false;
	calculator.calculated = false;
}

//Clear the last character pressed
function backspace() {
	let length = calculator.displayValue.length;
	let trimmed = calculator.displayValue.substring(0, length-1);
	calculator.displayValue = trimmed;
	if (!calculator.displayValue ) {
		calculator.displayValue = 0;
	}
}


/*
1.After hitting equals and displaying answer, the next digit pressed should be the only 
digit shown & the calculator object should reflect it appropriately.

2.Create the history function.

3.Create a check for the firstNum property where if firstNum.length = 14 the next
button pressed has to be an operator. (And push down display on font shrink)

4.Round display if repeating number?

5.If - is pressed before a number it should treat/display it as a negative number(tiny -)

6.Keyboard functions

7.When NaN is displayed and delete key is pressed, clear the entire length of NaN
*/