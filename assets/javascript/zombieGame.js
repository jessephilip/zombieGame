// set up npm inquirer
var inquirer = require("inquirer");

//set up inquirer.prompt

inquirer.prompt([
	{	
		type: "list",
		message: "Guess the id of the zombie attacking you:",
		choices: ["1", "2", "3", "4", "5"
			],
		name: "guess"
	}
]).then(function(data) {
	console.log(data.guess);
});

// this function generates the amount of health the player will start out with
function playerHealth() {
	return Math.floor(Math.random() * 100) + 50;
}

//this function generates the amount of health a zombie will start out with
function zombieHealth() {
	return Math.floor(Math.random() * 25) + 10;
}

// this function generates the id for the generated zombie
function zombieId() {
	return Math.floor(Math.random() * 5) + 1;
}

// this function generates the amount of damage player inflicts upon zombie if the player accurately guesses the zombie's id'
function attack() {
	return Math.floor(Math.random() * 5) + 1;
}