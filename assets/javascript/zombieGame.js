// set up npm inquirer
var inquirer = require("inquirer");

// this variable counts how many zombies the player successfully kills
var gameStats = {
	killCount: 0,
	playerHP: 0,
	zombie: 
};

// this function generates the amount of health the player will start out with
function playerHealth() {
	return Math.floor(Math.random() * 100) + 50;
}

//this function generates the amount of health a zombie will start out with
function zombieHealth() {
	return Math.floor(Math.random() * 5) + 10;
}

// this function generates the id for the generated zombie
function zombieId() {
	return Math.floor(Math.random() * 5) + 1;
}

// this function generates the amount of damage player inflicts upon zombie if the player accurately guesses the zombie's id
function attack() {
	return Math.floor(Math.random() * 5) + 1;
}

// this function creates an object called zombie
function createZombie() {
	var hp = zombieHealth();
	var id = zombieId();
	var zombie = {
		hp: hp,
		id: id
	};
	return zombie;
}

function prompt(zombie) {
	//set up inquirer.prompt
	inquirer.prompt([{
		type: "list",
		message: "Guess the id of the zombie attacking you:",
		choices: ["1", "2", "3", "4", "5", "stats"],
		name: "guess"
	}]).then(function (data) {
		var power;

		// if player's guess is equal to zombie's id number, damage zombie
		if (data.guess == zombie.id) {
			power = attack();
			zombie.hp = zombie.hp - power;
			console.log("Hit! You punched the zombie for " + power + "!");
		} else if (data.guess == "stats") {
			console.log("======================================================");
			console.log("You take a moment to recollect yourself.");
			console.log("Your HP is " + gameStats.playerHP + ".");
			console.log(gameStats.killCount + " zombies have fallen by your hand.");
			console.log("======================================================");

		} else {
			power = attack();
			gameStats.playerHP = gameStats.playerHP - power;
			console.log("Ouch! You were bitten by the zombie for " + power + "!");
		}

		// evaluate whether the player has died
		if (gameStats.playerHP <= 0) {
			gameOver();
		}

		// evaluate wheter the zombie has died
		else if (zombie.hp <= 0) {
			// increment killCount
			gameStats.killCount++;

			// create a new zombie
			gameStats.zombie = createZombie();
			console.log("You killed that zombie, but another one has risen to take its place.");
			prompt(gameStats.zombie);
		} else prompt(gameStats.zombie);

	});
}

// this function initializes the game by creating the player stats and first zombie
function initialize() {
	gameStats.playerHP = playerHealth();
	gameStats.zombie = createZombie();
	console.log("A zombie has risen in your path");

	prompt(gameStats.zombie);

}

// this function shows the gameover stats
function gameOver() {
	console.log("======================================================");
	console.log("You have fallen and risen again as one of the horde.");
	console.log("You fought bravely and killed " + gameStats.killCount + " zombies.");
	console.log("But, in the end, the night takes us all.");
	console.log("======================================================");
}

// startup Code
initialize();