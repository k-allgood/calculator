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
    	history();
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
	//If an answer is displayed check for a second number, and flag calculated as false
	if (calculator.calculated === true) {
		if (calculator.checkForSecondNum === true) {
			calculator.calculated = false;
		} else {
		//if answer is displayed, but we are not waiting on the secondNum, append digit to firstNum
		calculator.calculated = false;
		calculator.firstNum = digit;
		calculator.displayValue = calculator.firstNum;
		return;
		}
	}

	if (calculator.checkForSecondNum === true) {

		if (calculator.displayValue.includes("+")) {
			calculator.secondNum = displayValue.split("+")[1]; //numbers after sign
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
				calculator.secondNum = calculator.secondNum.split(hold)[1]; //everything after hold
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
			calculator.secondNum = displayValue.split("*")[1]; //numbers after sign
		}

		if (calculator.displayValue.includes("÷")) {
			calculator.secondNum = displayValue.split("÷")[1]; //numbers after sign
		}
	}
	//Appends digit to secondNum is firstNum is true
	if (calculator.checkForSecondNum) {
		calculator.displayValue = displayValue + digit;
		calculator.secondNum = calculator.secondNum + digit;
		return;
	}
	//If the display is 0, display the pressed number instead, otherwise append the next number
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
	//If there is an operator value, check if secondNum is negative
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
	displayValue = calculator.displayValue;

	if (displayValue.includes("+")) {
		answer = parseFloat(calculator.firstNum) + parseFloat(calculator.secondNum); //converts type to number
		calculator.displayValue = answer;
	}

	if (displayValue.includes("-")) {
		answer = parseFloat(calculator.firstNum) - parseFloat(calculator.secondNum); //converts type to number
		calculator.displayValue = answer;
	}

	if (displayValue.includes("*")) {
		console.log("* first: " + calculator.firstNum + " second: " + calculator.secondNum);
		answer = parseFloat(calculator.firstNum) * parseFloat(calculator.secondNum); //converts type to number
		calculator.displayValue = answer;
	}

	if (displayValue.includes("÷")) {
		console.log("÷ first: " + calculator.firstNum + " second: " + calculator.secondNum);
		answer = parseFloat(calculator.firstNum) / parseFloat(calculator.secondNum); //converts type to number
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
function history() {
	const history = document.querySelector("#displayhistory");
	let first = calculator.firstNum;
	let op = calculator.operator;
	let second = calculator.secondNum;

	calculator.history = first + op + second;
	history.innerHTML = calculator.history;
	calculator.operator = null;
	calculator.firstNum = calculator.displayValue.toString();
	calculator.secondNum = null;
}


/*
1.Create a check for the firstNum property where if firstNum.length = 14 the next
button pressed has to be an operator. (And push down display on font shrink)

2.Keyboard functions
*/
