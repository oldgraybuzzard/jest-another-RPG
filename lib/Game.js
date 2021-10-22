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

        this.startNewBattle();

    });
};

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEenemy.agility) {
        this.isPlayerturn = true;
    } else {
        this.isPlayerturn = false;
    }

    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEenemy.getDescription());

    this.battle();
};

Game.prototype.battle = function() {
    inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['Attack', 'Use potion']
          })
          .then(({ action }) => {
            if (action === 'Use potion') {
                if (action === 'Use potion') {
                    if (!this.player.getInventory()) {
                      console.log("You don't have any potions!");
                      return;
                    }
                  
                    inquirer
                      .prompt({
                        type: 'list',
                        message: 'Which potion would you like to use?',
                        name: 'action',
                        choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                      })
                      .then(({ action }) => {
                        const potionDetails = action.split(': ');
                    
                        this.player.usePotion(potionDetails[0] - 1);
                        console.log(`You used a ${potionDetails[1]} potion.`);
                      });
                  }
            } else {
              const damage = this.player.getAttackValue();
              this.currentEnemy.reduceHealth(damage);
      
              console.log(`You attacked the ${this.currentEnemy.name}`);
              console.log(this.currentEnemy.getHealth());
            }
          });
}


module.exports = Game;