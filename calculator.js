const calculator = {
	displayValue: "0",
	firstNum: null,
	secondNum: null,
	checkForSecondNum: false,
	operator: null,
	calculated: false,
	history: null,
};

function update() {
	const display = document.querySelector("#displaynum");
	const history = document.querySelector("#displayhistory");

	//sets the calc obj property displayValue to a maxlength
	calculator.displayValue = String(calculator.displayValue).substring(0, 16);
	display.innerHTML = calculator.displayValue;
	history.innerHTML = calculator.history;

	if (calculator.displayValue.length >= 15) {
		display.style.fontSize = "24px";
		display.innerHTML = calculator.displayValue.substring(0, 16);
		return;
	} else if (calculator.displayValue.length < 15) {
		display.style.fontSize = "32px";
	}
}
update(); //call to display 0 on load

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
    	showHistory();
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
	if (calculator.calculated === true) {
		if (calculator.checkForSecondNum === true) {
			calculator.calculated = false;
		} else {
		calculator.calculated = false;
		calculator.firstNum = digit;
		calculator.displayValue = calculator.firstNum;
		return;
		}
	}

	if (calculator.checkForSecondNum === true) {

		if (calculator.displayValue.includes("+")) {
			calculator.secondNum = displayValue.split("+")[1]; 
		}

		if (calculator.displayValue.includes("-")) {
			//Count the - in the display
			let count = calculator.displayValue.split("-").length-1;
			if (count === 3) {
				calculator.displayValue = displayValue + digit;
				calculator.secondNum = calculator.secondNum + digit;
				return;
			}
			if (calculator.firstNum.includes("-")) {
				let hold = displayValue.split("-")[1];
				calculator.secondNum = displayValue.split("-")[1]; 
                                //everything after hold
				calculator.secondNum = calculator.secondNum.split(hold)[1]; 
			} 
			//If the 1st number ISN'T negative & the operator is a minus sign
			if (!calculator.firstNum.includes("-") && calculator.operator === "-") {
				calculator.secondNum = displayValue.split("-")[1]; 
			}
			//If only the 2nd number is negative
			if (!calculator.firstNum.includes("-") && !calculator.operator === "-") {
				calculator.secondNum = "-" + calculator.secondNum.split("-")[1];
			}
			//If there are two "-" in the display and the 1st number is positive
			if (count === 2 && !calculator.firstNum.includes("-")) {
				let numbers = displayValue.split("-")[1]; 
				calculator.secondNum = "-" + numbers;
			}
		}

		if (calculator.displayValue.includes("*")) {
			calculator.secondNum = displayValue.split("*")[1];
		}

		if (calculator.displayValue.includes("÷")) {
			calculator.secondNum = displayValue.split("÷")[1];
		}
	}
	//Appends digit to secondNum is firstNum is true
	if (calculator.checkForSecondNum) {
		calculator.displayValue = displayValue + digit;
		calculator.secondNum = calculator.secondNum + digit;
		return;
	}
	//Display next number
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

	//Add decimal 
	if(!displayValue.includes(decimal)) {
		calculator.displayValue = displayValue += decimal;
		calculator.firstNum = displayValue += decimal;
		return;
		}

	if(secondNum.includes(decimal)) {
		return;
	}

	//Append decimal to secondNum
	if (calculator.checkForSecondNum === true) {

		if (displayValue.includes("+")) {
			calculator.secondNum = displayValue.split("+")[1] += decimal;
		}

		if (displayValue.includes("-")) {
			calculator.secondNum = displayValue.split("-")[1] += decimal;
		}

		if (displayValue.includes("*")) {
			calculator.secondNum = displayValue.split("*")[1] += decimal;
		}

		if (displayValue.includes("÷")) {
			calculator.secondNum = displayValue.split("÷")[1] += decimal;
		}

		calculator.displayValue = displayValue += decimal;
		calculator.secondNum = displayValue += decimal;
	}

}

function signs(operator) {
	//Sets "-" as the first character in the display
	if (calculator.displayValue === "0" && operator === "-") {
		calculator.displayValue = operator;
		calculator.firstNum = operator;
		return;
	}
	//Set the operator value
	if (calculator.operator === null) {
		calculator.operator = operator;
		calculator.displayValue = calculator.displayValue + operator;
		calculator.checkForSecondNum = true;
		return;
	}
	if (calculator.checkForSecondNum === true && operator === "-") {
		if (calculator.secondNum === null) {
			calculator.displayValue = calculator.displayValue + operator;
			calculator.secondNum = operator;
		}
		if (calculator.secondNum.includes("-")) {
			return;
		} 
	}
}

function equals() {
	if (calculator.operator.includes("+")) {
		answer = parseFloat(calculator.firstNum) + parseFloat(calculator.secondNum);
		calculator.displayValue = answer;
	}

	if (calculator.operator.includes("-")) {
		answer = parseFloat(calculator.firstNum) - parseFloat(calculator.secondNum); 
		calculator.displayValue = answer;
	}

	if (calculator.operator.includes("*")) {
		answer = parseFloat(calculator.firstNum) * parseFloat(calculator.secondNum); 
		calculator.displayValue = answer;
	}

	if (calculator.operator.includes("÷")) {
		answer = parseFloat(calculator.firstNum) / parseFloat(calculator.secondNum); 
		calculator.displayValue = answer;
	}
	calculator.checkForSecondNum = false;
	calculator.calculated = true;
}

function squareroot() {
	let square = Math.sqrt(calculator.displayValue);
	calculator.displayValue = square;
}

//Sets all values of calculator object to 0 or false, clearing display
function clear() {
	calculator.displayValue = "0";
	calculator.firstNum = null;
	calculator.secondNum = null;
	calculator.checkForSecondNum = false;
	calculator.operator = null;
	calculator.calculated = false;
	calculator.history = null;
}

//Clear the last character pressed
function backspace() {
	let length = calculator.displayValue.length;
	let trimmed = calculator.displayValue.substring(0, length-1); 

	if (!calculator.displayValue) {
		calculator.displayValue = 0;
	}
	//Checks for the string "Na" because "N" would be deleted on keypress.
	if (calculator.displayValue === "Na") {
		clear();
	}

	//Checks for an operator
	if (calculator.operator) {
		let str = String(calculator.displayValue);
		let end = str.charAt(str.length-1); //last character deleted

		//If an operator, remove value from operator property
		if (end === "+" ||
			end === "-" ||
			end === "*" ||
			end === "÷")
		calculator.operator = null;
	}
	calculator.displayValue = trimmed;
	if (length <= 1) {
		clear();
	}
}

//Only runs when equal is pressed
function showHistory() {
	const history = document.querySelector("#displayhistory");
	let first = calculator.firstNum;
	let op = calculator.operator;
	let second = calculator.secondNum;

	calculator.history = first + op + second;
	history.innerHTML = calculator.history;
	calculator.firstNum = calculator.displayValue.toString();
	calculator.secondNum = null;
	calculator.operator = null;
}
