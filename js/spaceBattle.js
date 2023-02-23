

class AlienShip {
	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.maxHull = getRandom(3, 10);
		this.hull = this.maxHull
		this.firepower = getRandom(2, 4);
		this.accuracy = getRandom(6, 8) / 10;
		this.isDestroyed = false;
	}
	attack = function (shooter, target) {
		// returns hits as true, misses as false
		console.log(`${shooter.name} attacks ${target.name}`);
		if (shooter.accuracy < getRandom(0, 1)) {
			return true;
		} else {
			return false;
		}
	};
}

class HeroShip extends AlienShip {
	name = "USS_Schwarzenegger";
	id = 0;
	firepower = 5;
	accuracy = 0.7;
	hull = 20;
	maxhull = 20;
	missiles = 3;
	missleFirepower = 10;
	repairShields = function () {
		if (this.hull < 20 && this.hull != 0) {
			let hullRepair = getRandom(0, 2);
			let hullRepairPercentage = hullRepair / 0.2;
			console.log(
				`your ship's engineers restore ${hullRepairPercentage}% of your ship's hull`
			);
			this.hull += hull+hullRepair*hull;
		}
	};
	
}

const game = {
	// trying to see if I can isolate the loop like this

	gameOver: false,

	alienShipsRemaining: function (enemyList) {
		let destroyList = enemyList.filter((ships) => ships.isDestroyed === false);
		return destroyList.length;
	},

	calculateDamage: function (shooter, target, firepower) {
		target.hull -= firepower;
		if (target.hull <= 0) {
			target.hull = 0; // this prevents a negative hull score in the dash
			if (target.name === "USS_Schwarzenegger") { 
				console.log("ship destroyed, game over");
				let boom = document.getElementById('player-ship');
				boom.src = "/img/explosion.png"

				game.gameOver = true;
			} else {
				let updateHull = document.getElementById(`alienHull${target.id}`)
				updateHull.value = target.hull;
				console.log(`${shooter.name} hits ${target.name} for ${firepower}!`);
				console.log(`${target.name} destroyed!`);
				target.isDestroyed = true;
				let destroyEnemy = document.getElementById(`${target.id}`)
				destroyEnemy.src = '/img/explosion.png'
				
				console.log(destroyEnemy)
				setTimeout(() => {
					
					console.log(destroyEnemy)
					let destroyDiv = document.getElementById(`alienDiv${target.id}`)
					destroyDiv.remove();}, 500

				)
				

			}
		} else {
			console.log(`${shooter.name} hits ${target.name} for ${firepower}!`);
			

		}
	},

	/* targetEnemy: function () {
		console.log(
			"your handy targeting system provides you with the status of the enemy fleet"
		);
		game.displayHUD(enemies);
		let alienIndex = prompt(
			`Which alien ship would you like to attack? [0-${totalShips - 1}] - `
		);
		console.clear();

		if (
			isNaN(alienIndex) ||
			alienIndex >= enemies.length ||
			alienIndex === "" ||
			alienIndex < 0
		) {
			console.clear();
			console.log("this is no time for games, choose your target!");
			game.targetEnemy();
		} else {
			currentEnemy = enemies[alienIndex];
		}
		if (currentEnemy.isDestroyed) {
			console.log("that ship is already destroyed! choose another target");
			game.targetEnemy();
		}
		return alienIndex;
	}, */

	

	displayHUD: function () {
		console.table(enemies);
		console.table(heroShip);
	},
};
const enemies = [];
let heroShip = new HeroShip();
let totalShips = 0;
let currentEnemy = 0;
let enemyAttack = '';

// clear the battle log when the game is started
const startButton = document.querySelector('aside button');
startButton.addEventListener('click', () => {
	document.querySelector('aside').innerHTML = '<h1> Round One</h1>'
	document.querySelector('aside').style.display = 'none'
	gameStart();
})

// set up targeting





let attackList = []


function gameLoop() {
	
		
		
		let heroAttackResult = heroShip.attack(heroShip, currentEnemy);
		if (heroAttackResult) {
			game.calculateDamage(heroShip, currentEnemy, heroShip.firepower);
			updateHealthBar(currentEnemy);
		} else {
			console.log("your gunner was distracted and missed!");
			for (i=0; i< enemies.length; i++){
				if (!enemies[i].isDestroyed){
					attackList.push(enemies[i].id)
				}
			}
			console.log(`this is a list of undestroyed enemy ships: ${attackList}`)
				console.log(enemies)// ensures that only ships that aren't destroyed can attack
			let multEnemyAttack = getRandom(1, attackList.length / 2); // allows up to half of remaining enemies to attack
			console.log(`${multEnemyAttack} alien ships charge their lasers...`);
			for (let i = 0; i < multEnemyAttack; i++) {
				let randEnemyIndex = getRandom(0, attackList.length -1);
				console.log(`this is the random enemy index ${randEnemyIndex}`)
				
				let attackIndex = attackList[randEnemyIndex]
				let enemyAttack = enemies[attackIndex].attack(enemies[attackIndex], heroShip);
			
				let returnFlare = document.querySelector(`#alienFlare${attackIndex}`);
				returnFlare.style.display = 'block';
				// i thought it would be cool to have the alien ships show a barrel flare when they return fire, but it has introduced a bug (kind of)
				// because I have to show the flare for a decent amount of time to have it register on the screen, it delays the 
				// removal of the element from the attackList and keeps it in the array after it was destroyed.
				// so for now i've limited the number of aliens who can return fire to two until i can figure out how to fix it.

				setTimeout (() => returnFlare.style.display = 'none', 250)

				
				if (enemyAttack === false) {
					console.log(`${enemies[attackIndex].name} fires and misses!`);
				} else {
					game.calculateDamage(
						enemies[attackIndex],
						heroShip,
						enemies[attackIndex].firepower
					);
					let playerHealth = document.getElementById('playerHealth')
					playerHealth.style.width = `${(heroShip.hull / heroShip.maxHull)*100}%`
				}
			}
			
		}
		attackList = []
		heroShip.repairShields();
		
	
}

function getRandom(min, max) {
	//returns a random float
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameStart() {
	// fills the enemy ship array with new AlienShips with random stats
	const randomEnemies = getRandom(6, 12);
	for (let i = 0; i < randomEnemies; i++) {
		let alien = new AlienShip(`alien ship ${i}`, i);
		enemies.push(alien);
		let fleetWindow = document.getElementById('alien-fleet')
		let alienDiv = document.createElement('div')
		fleetWindow.appendChild(alienDiv) 
		alienDiv.id = `alienDiv${i}`
		alienDiv.setAttribute('class', 'alienDiv')
		let alienHTML = document.createElement('img')
		alienHTML.src = '/img/alien-ship.png';
		alienHTML.alt = 'an alien spaceship';
		alienHTML.setAttribute('class', 'alien')
		alienHTML.setAttribute('id', `${i}` )
		let alienFlare = document.createElement('img');
		alienFlare.src = '/img/barrel-flare-reverse.png'
		alienFlare.alt = 'alien barrel flare'
		alienFlare.id = `alienFlare${i}`
		let alienHull = document.createElement('div');
		alienHull.classList = `progress`
		alienHull.id = `alienHull${i}`
		alienHull.setAttribute('data-total', `${alien.hull}`)
		alienHull.setAttribute('data-value', `${alien.hull}`)
		alienDiv.append(alienHull);
		alienDiv.append(alienHTML);
		alienDiv.append(alienFlare)
		
		
	}
	const alienShips = document.querySelectorAll('.alien');
	for (let alien of alienShips){
		console.log(alien)
		alien.addEventListener('click', (event) => {
			const barrelFlare = document.querySelector('img[alt="barrel flare"]')
			barrelFlare.style.display = 'block'
			heroShip.firepower = 5;
			currentEnemy = enemies[alien.id]
			console.log(currentEnemy);
			setTimeout (() => barrelFlare.style.display = 'none', 1000)
			// attack enemy ship
			gameLoop();
		})
		alien.addEventListener('contextmenu', (event) => {
			if (heroShip.missiles > 0){
				console.log('switching to missiles')
				const barrelFlare = document.querySelector('img[alt="barrel flare"]')
				barrelFlare.style.display = 'block'
				heroShip.firepower = 10;
				currentEnemy = enemies[alien.id]
				console.log(currentEnemy);
				setTimeout (() => barrelFlare.style.display = 'none', 1000)
				return false;
			}else{
				alert('no missiles left!')
				return false;
			}
			
			// attack enemy ship
			gameLoop();
		})
		
	}
	totalShips = enemies.length;
	console.log(`an armada of alien ships approaches!`);
}

function checkEnd() {
	// tracks win/loss conditions
	let shipsRemaining = game.alienShipsRemaining(enemies);
	if (shipsRemaining === 0) {
		console.log("you win!!!");
		game.gameOver = true;
		return true;
	} else if (heroShip.hull <= 0) {
		youLose("destroyed");
		return true;
	} else {
		return false;
	}
}

function youLose(reason) {
	console.log("you lose");
	if (reason === "destroyed") {
		console.log("your ship is destroyed due to your woeful mismanagement");
	} else {
		console.log("you shamefully retreat and forfeit the game...loser");
	}
}

function updateHealthBar(alien){
	let healthBar = document.getElementById(`alienHull${alien.id}`)

	 
    healthBar.style.width = `${(alien.hull / alien.maxHull)*100}%`
	console.log(alien.hull / alien.maxHull)
    
}