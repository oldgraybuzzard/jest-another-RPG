const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerturn = false;
    this.enemies = [];
    this.currentEenemy;
    this.player;
}

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('ord', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    this.currentEenemy = this.enemies[0];

    inquirer
    .prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?'
    })
    // destructure name from the prompt object
    .then(({ name }) => {
        this.player = new Player(name);

        //test the object creation
        console.log(this.startNewBattle());
    })

};

module.exports = Game;