

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
			let hullRepairPercentage = hullRepair * 0.05;
			
			this.hull += (hullRepairPercentage*this.hull);
			
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
				
				let boom = document.getElementById('player-ship');
				boom.src = "/img/explosion.png"

				game.gameOver = true;
			} else {
				let updateHull = document.getElementById(`alienHull${target.id}`)
				updateHull.value = target.hull;
				
				target.isDestroyed = true;
				let destroyEnemy = document.getElementById(`${target.id}`)
				destroyEnemy.src = '/img/explosion.png'
				
				
				setTimeout(() => {
					
					
					let destroyDiv = document.getElementById(`alienDiv${target.id}`)
					destroyDiv.remove();}, 500

				)
				

			}
		} else {
			
			

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
let enemies = [];
let heroShip = new HeroShip();
let totalShips = 0;
let currentEnemy = 0;
let enemyAttack = '';

// clear the battle log when the game is started
const startButton = document.querySelector('aside button');
startButton.addEventListener('click', () => {
	document.querySelector('aside').innerHTML = `<p id='hudName'>USS Schwarzenegger</p> <br> <p id='hudHull'>Hull: ${heroShip.hull}</p> <br> <p id='hudMissiles'>Missiles: ${heroShip.missiles}</p><br><p>Firepower: ${heroShip.firepower}`
	
	gameStart();
})

// set up targeting





let attackList = []


function gameLoop() {
	
		
		
		let heroAttackResult = heroShip.attack(heroShip, currentEnemy);
		if (heroAttackResult) {
			game.calculateDamage(heroShip, currentEnemy, heroShip.firepower);
			updateHealthBar(currentEnemy);
			checkEnd();
		} else {
			
			for (i=0; i< enemies.length; i++){
				if (!enemies[i].isDestroyed){
					attackList.push(enemies[i].id)
				}
			}
				
			let multEnemyAttack = getRandom(1, attackList.length / 2); // allows up to half of remaining enemies to attack
			
			for (let i = 0; i < multEnemyAttack; i++) {
				let randEnemyIndex = getRandom(0, attackList.length -1);
				
				
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
					
				} else {
					game.calculateDamage(
						enemies[attackIndex],
						heroShip,
						enemies[attackIndex].firepower
					);
					updateHeroHealthBar();
					checkEnd();
				}
			}
			
		}
		attackList = []
		heroShip.repairShields();
		updateHeroHealthBar();
		
		
	
}

function getRandom(min, max) {
	//returns a random float
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameStart() {
	// fills the enemy ship array with new AlienShips with random stats
	document.getElementById('alien-fleet').innerHTML = ''
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
		
		alien.addEventListener('click', (event) => {
			const barrelFlare = document.querySelector('img[alt="barrel flare"]')
			barrelFlare.style.display = 'block'
			heroShip.firepower = 5;
			currentEnemy = enemies[alien.id]
			
			setTimeout (() => barrelFlare.style.display = 'none', 1000)
			// attack enemy ship
			gameLoop();
		})
		alien.addEventListener('contextmenu', (event) => {
			if (heroShip.missiles > 0){
				
				const barrelFlare = document.querySelector('img[alt="barrel flare"]')
				barrelFlare.style.display = 'block'
				heroShip.firepower = 10;
				currentEnemy = enemies[alien.id]
				heroShip.missiles -= 1;
				setTimeout (() => barrelFlare.style.display = 'none', 1000)
				gameLoop();
			}else{
				alert('no missiles left!')
				return false;
			}
			
			// attack enemy ship
			gameLoop();
		})
		
	}
	totalShips = enemies.length;
	
}

function checkEnd() {
	// tracks win/loss conditions
	let shipsRemaining = game.alienShipsRemaining(enemies);
	console.log(shipsRemaining);
	if (shipsRemaining === 0) {
		alert('you win!')
		game.gameOver = true;
		gameRestart();
		return true;
	} else if (heroShip.hull <= 0) {
		youLose("destroyed");
		gameRestart();
		return true;
	} else {
		return false;
	}
}

function youLose(reason) {
	
	if (reason === "destroyed") {
		alert('your ship has been destroyed')
		gameRestart();
	} else {
		alert('you lose')
		gameRestart();
	}
}

function updateHealthBar(alien){
	let healthBar = document.getElementById(`alienHull${alien.id}`)

	 
    healthBar.style.width = `${(alien.hull / alien.maxHull)*100}%`
	
    
}

function updateHeroHealthBar(){
	let healthBar = document.getElementById(`playerHealth`)

	 
    healthBar.style.width = `${(heroShip.hull/heroShip.maxHull)*100}%`
	document.querySelector('aside').innerHTML = `<p id='hudName'>USS Schwarzenegger</p> <br> <p id='hudHull'>Hull: ${heroShip.hull}</p> <br> <p id='hudMissiles'>Missiles: ${heroShip.missiles}</p><br><p>Firepower: ${heroShip.firepower}`

    
}

function gameRestart(){
	let restartButton = document.createElement('button');
		restartButton.innerHTML = 'Restart Game'
		restartButton.addEventListener('click', () => {
			heroShip.hull = 20
			heroShip.missiles = 3
			document.querySelector('aside').innerHTML = `<p id='hudName'>USS Schwarzenegger</p> <br> <p id='hudHull'>Hull: ${heroShip.hull}</p> <br> <p id='hudMissiles'>Missiles: ${heroShip.missiles}</p><br><p>Firepower: ${heroShip.firepower}`
			document.getElementById('player-ship').src = '/img/player-ship.png'
			enemies = []
			gameStart();}
		)
		let alienFleet = document.getElementById('alien-fleet')
		alienFleet.innerHTML='';
		alienFleet.append(restartButton);
}