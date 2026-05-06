/*
	Blackjack 21
	A simple game developed using Javascript, HTML and CSS

	@author Stayko Chalakov
	@version 1.0
	@date 29.06.2017
*/

//namespacing
var BlackjackJS = (function() {

	/**************
		Card class
	***************/

	/*
		Constructor
		@param {String} rank
		@param {String} suit
	*/
	function Card(rank, suit){
		this.rank = rank;
	  this.suit = suit;
	}

	/*
		Gets the value or points of the card
		@param {Integer} currentTotal - The current total score of the
		player's hand
	*/
	Card.prototype.getValue = function(currentTotal){
		var value = 0;

		if (this.rank == 'A' && currentTotal < 11){
				value = 11;
		} else if (this.rank == 'A'){
				value = 1;
		} else if (this.rank == 'J' || this.rank == 'Q' || this.rank == 'K'){
				value = 10;
		} else {
				value = parseInt(this.rank);
		}
		return value;
	}

	/*******************
		Renders the card
	*******************/
	Card.prototype.view = function(){
		var htmlEntities = {
			'hearts' : '&#9829;',
			'diamonds' : '&#9830;',
			'clubs' : '&#9827;',
			'spades' : '&#9824;'
		}
		return `
			<div class="card ` + this.suit + `">
				<div class="top rank">` + this.rank + `</div>
				<div class="suit">` + htmlEntities[this.suit] + `</div>
				<div class="bottom rank">` + this.rank + `</div>
			</div>
		`;
	}

	/*************************** End of Card class ********************************/

	/***************
		Player class
	***************/

	/*
		Constructor
		@param {String} element - The DOM element
		@param {Array} hand - the array which holds all the cards
	*/
	function Player(element, hand){
		this.hand = hand;
		this.element = element;
	}

	/*
		Hit player with new card from the deck
		@param {Card} card - the card to deal to the player
	*/
	Player.prototype.hit = function(card){
		this.hand.push(card);
	}

	/*
		Returns the total score of all the cards in the hand of a player
	*/
	Player.prototype.getScore = function(hideHoleCard){
		var points = 0;
		for(var i = 0; i < this.hand.length; i++){
			if(hideHoleCard && i === 1) continue;
			if(i == 0) points = this.hand[i].getValue(0);
			else points += this.hand[i].getValue(points);
		}
		return points;
	}

	/*
		Returns the array (hand) of cards
	*/
	Player.prototype.showHand = function(hideHoleCard){
		var hand = "";
		for(var i = 0; i < this.hand.length; i++){
			if (hideHoleCard && i === 1) {
				hand += '<div class="card card-hidden"><div class="back"></div></div>';
			} else {
				hand += this.hand[i].view();
			}
		}
		return hand;
	}

	/*************************** End of Player class ******************************/

	/*************************
		Deck - Singleton class
	*************************/
	var Deck = new function(){
		this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		this.suits = ['hearts', 'spades', 'diamonds','clubs'];
	  this.deck;

		/*
			Fills up the deck array with cards
		*/
		this.init = function(){
			this.deck = []; //empty the array
			for(var s = 3; s >= 0; s--){
		  	for(var r = 12; r >= 0; r--){
		    	this.deck.push(new Card(this.ranks[r], this.suits[s]));
		    }
		  }
		}

		/*
			Shuffles the cards in the deck randomly
		*/
		this.shuffle = function(){
			 var j, x, i;
			 for (i = this.deck.length; i; i--) {
					 j = Math.floor(Math.random() * i);
					 x = this.deck[i - 1];
					 this.deck[i - 1] = this.deck[j];
					 this.deck[j] = x;
			 }
		}

	}

	/**************************** End of Deck class *******************************/

	/*************************
		Game - Singleton class
	**************************/

	var Game = new function(){

		this.bankroll = localStorage.getItem('blackjack_bankroll') ? parseInt(localStorage.getItem('blackjack_bankroll')) : 1000;
		this.currentBet = 50;

		this.soldItemsCount = localStorage.getItem('blackjack_sold_items') ? parseInt(localStorage.getItem('blackjack_sold_items')) : 0;
		this.bailoutItems = [
			{ name: 'Left Kidney', value: 1000 },
			{ name: 'Right Kidney', value: 1000 },
			{ name: 'Appendix', value: 500 },
			{ name: 'Left Cornea', value: 800 },
			{ name: 'Right Cornea', value: 800 },
			{ name: 'Plasma', value: 200 },
			{ name: 'A Family Heirloom', value: 2000 },
			{ name: 'Your Dignity', value: 10 },
			{ name: 'Your Soul', value: 5000 },
			{ name: 'A Mystery Organ', value: 50 }
		];

		/*
			Deal button event handler
		*/
		this.dealButtonHandler = function(){
			if (this.currentBet > this.bankroll) {
				this.setMessage('Not enough bankroll!');
				return;
			}
			this.bankroll -= this.currentBet;
			this.updateBankrollUI();

			Game.start();
			this.dealButton.disabled = true;
			this.hitButton.disabled = false;
			this.standButton.disabled = false;
			if (this.bankroll >= this.currentBet) {
				this.doubleButton.disabled = false;
			}
			
			this.betIncreaseButton.disabled = true;
			this.betDecreaseButton.disabled = true;
		}

		/*
			Hit button event handler
		*/
		this.hitButtonHandler = function(){
			this.doubleButton.disabled = true; // Can only double down on first move
			//deal a card and add to player's hand
			var card = Deck.deck.pop();
			this.player.hit(card);

			//render the card and score
			document.getElementById(this.player.element).innerHTML += card.view();
			this.playerScore.innerHTML = this.player.getScore();

			//if over, then player looses
			if(this.player.getScore() > 21){
				this.gameEnded('You lost!', 'lose');
			}
		}

		/*
			Stand button event handler
		*/
		this.standButtonHandler = function(){
			this.hitButton.disabled = true;
			this.standButton.disabled = true;
			this.doubleButton.disabled = true;

			var self = this;
			
			// Reveal dealer's hole card immediately
			document.getElementById(self.dealer.element).innerHTML = self.dealer.showHand(false);
			self.dealerScore.innerHTML = self.dealer.getScore(false);
			
			// Async dealer drawing for suspense
			function dealerPlay() {
				if(self.dealer.getScore() < 17){
					var card = Deck.deck.pop();
					self.dealer.hit(card);
					document.getElementById(self.dealer.element).innerHTML += card.view();
					self.dealerScore.innerHTML = self.dealer.getScore();
					setTimeout(dealerPlay, 600); // 600ms delay per heartbeat
				} else {
					self.resolveGame();
				}
			}
			
			// Start the dealer's draw loop
			dealerPlay();
		}
		
		/*
			Determine win condition once dealer finishes drawing
		*/
		this.resolveGame = function() {
			var playerScore = this.player.getScore();
			var dealerScore = this.dealer.getScore();

			if (dealerScore > 21) {
				this.gameEnded('Dealer busted! You won!', 'win');
			} else if (dealerScore > playerScore) {
				this.gameEnded('You lost!', 'lose');
			} else if (dealerScore < playerScore) {
				this.gameEnded('You won!', 'win');
			} else {
				this.gameEnded('Push! It\'s a draw.', 'push');
			}
		}
		/*
			Double Down button event handler
		*/
		this.doubleButtonHandler = function(){
			this.bankroll -= this.currentBet;
			this.currentBet *= 2;
			this.updateBankrollUI();

			this.hitButtonHandler();
			if (this.player.getScore() <= 21) {
				this.standButtonHandler();
			}
		}

		/*
			Bet Increase/Decrease Handlers
		*/
		this.betIncreaseHandler = function() {
			if (this.currentBet + 50 <= this.bankroll) {
				this.currentBet += 50;
				this.updateBankrollUI();
			}
		}

		this.betDecreaseHandler = function() {
			if (this.currentBet - 50 > 0) {
				this.currentBet -= 50;
				this.updateBankrollUI();
			}
		}

		/*
			Update Bankroll & Bet UI
		*/
		this.updateBankrollUI = function() {
			document.getElementById('bankroll').innerHTML = this.bankroll;
			document.getElementById('current-bet').innerHTML = this.currentBet;
			localStorage.setItem('blackjack_bankroll', this.bankroll);
			
			// Disable Deal button if bet exceeds bankroll
			var dealBtn = document.getElementById('deal');
			if (dealBtn) {
				dealBtn.disabled = this.currentBet > this.bankroll;
			}

			// Show or Hide Bailout Button
			var blackMarket = document.getElementById('black-market');
			if (this.bankroll < 50 && this.bailoutButton && blackMarket) {
				blackMarket.style.display = 'flex';
				this.bailoutButton.style.display = 'inline-block';
				var nextItem = this.bailoutItems[Math.min(this.soldItemsCount, this.bailoutItems.length - 1)];
				var itemLabel = nextItem ? nextItem.name : "Mystery Organ";
				var itemYield = nextItem ? nextItem.value : 50;
				this.bailoutButton.innerHTML = "SELL " + itemLabel.toUpperCase() + " ($" + itemYield + ")";
			} else if (blackMarket) {
				blackMarket.style.display = 'none';
			}
		}

		/*
			Bailout / Sell Organ
		*/
		this.bailoutHandler = function() {
			var nextItem = this.bailoutItems[Math.min(this.soldItemsCount, this.bailoutItems.length - 1)];
			var itemName = nextItem ? nextItem.name : "Unidentifiable Bulk Meat";
			var itemValue = nextItem ? nextItem.value : 50;

			if (itemName === 'Your Soul' && Math.random() < 0.5) {
				this.setMessage("Your soul is lost... You died.");
				var statusEl = document.getElementById('status');
				statusEl.style.color = '#e74c3c';
				document.body.classList.add('dead-vision');
				this.bankroll = 0;
				this.updateBankrollUI();
				var blackMarket = document.getElementById('black-market');
				if (blackMarket) {
					blackMarket.style.display = 'none';
				}
				// Disable controls permanently
				var buttons = document.querySelectorAll('.game-controls button');
				for (var i = 0; i < buttons.length; i++) {
					buttons[i].disabled = true;
				}
				return;
			}

			if (itemName === 'Left Cornea' || itemName === 'Right Cornea') {
				document.body.classList.add('blur-vision');
			}

			this.bankroll += itemValue;
			this.soldItemsCount++;
			localStorage.setItem('blackjack_sold_items', this.soldItemsCount);

			if (this.currentBet < 50 && this.bankroll >= 50) {
				this.currentBet = 50;
			}

			this.setMessage("Sold " + itemName + " for $" + itemValue + "!");
			var statusEl = document.getElementById('status');
			statusEl.style.color = '#9b59b6';
			statusEl.style.textShadow = '0 0 10px #9b59b6';

			this.updateBankrollUI();
		}

		/*
			Initialise
		*/
		this.init = function(){
			this.dealerScore = document.getElementById('dealer-score').getElementsByTagName("span")[0];
			this.playerScore = document.getElementById('player-score').getElementsByTagName("span")[0];
			this.dealButton = document.getElementById('deal');
			this.hitButton = document.getElementById('hit');
			this.standButton = document.getElementById('stand');
			this.doubleButton = document.getElementById('double');
			this.betIncreaseButton = document.getElementById('bet-increase');
			this.betDecreaseButton = document.getElementById('bet-decrease');
			this.bailoutButton = document.getElementById('bailout');

			//attaching event handlers
			this.dealButton.addEventListener('click', this.dealButtonHandler.bind(this));
			this.hitButton.addEventListener('click', this.hitButtonHandler.bind(this));
			this.standButton.addEventListener('click', this.standButtonHandler.bind(this));
			this.doubleButton.addEventListener('click', this.doubleButtonHandler.bind(this));
			this.betIncreaseButton.addEventListener('click', this.betIncreaseHandler.bind(this));
			this.betDecreaseButton.addEventListener('click', this.betDecreaseHandler.bind(this));
			this.bailoutButton.addEventListener('click', this.bailoutHandler.bind(this));
			
			this.updateBankrollUI();

		}

		/*
			Start the game
		*/
		this.start = function(){

			//initilaise and shuffle the deck of cards
			Deck.init();
			Deck.shuffle();

			//deal two cards to dealer
			this.dealer = new Player('dealer', [Deck.deck.pop(), Deck.deck.pop()]);

			//deal two cards to player
			this.player = new Player('player', [Deck.deck.pop(), Deck.deck.pop()]);

			//render the cards (hide dealer's second card)
			document.getElementById(this.dealer.element).innerHTML = this.dealer.showHand(true);
			document.getElementById(this.player.element).innerHTML = this.player.showHand();

			//renders the current scores (hide dealer's second card score)
			this.dealerScore.innerHTML = this.dealer.getScore(true);
			this.playerScore.innerHTML = this.player.getScore();

			var statusEl = document.getElementById('status');
			statusEl.style.color = '#fff';
			statusEl.style.textShadow = '0 2px 10px rgba(255,255,255,0.2)';

			// Check for instant blackjack
			if (this.player.getScore() === 21) {
				this.standButtonHandler(); // Dealer's turn
			} else {
				this.setMessage("Hit or Stand?");
			}
		}

		/*
			If the player wins or looses
		*/
		this.gameEnded = function(str, result){
			if (result === 'win') {
				// Check if natural blackjack (2 cards, 21 points)
				if (this.player.hand.length === 2 && this.player.getScore() === 21) {
					this.bankroll += this.currentBet * 2.5; // 3:2 payout
					str += " (Blackjack 3:2 Payout!)";
				} else {
					this.bankroll += this.currentBet * 2; // 1:1 payout
				}
			} else if (result === 'push') {
				this.bankroll += this.currentBet;
			}
			// if lose, bankroll is already deducted
			
			// Reset bet to baseline if doubled
			if (this.currentBet % 100 !== 50 && this.currentBet !== 50) {
                 // Trying to naive restore original bet size if doubled
				 this.currentBet = Math.ceil(this.currentBet / 2);
			}

			this.updateBankrollUI();

			if (this.bankroll < 50) {
				str += " - You're broke! Time to sell some organs.";
			}

			this.setMessage(str);
			
			var statusEl = document.getElementById('status');
			if (result === 'win') {
				statusEl.style.color = '#2ecc71';
				statusEl.style.textShadow = '0px 0px 10px #2ecc71';
			} else if (result === 'lose') {
				statusEl.style.color = '#e74c3c';
				statusEl.style.textShadow = '0px 0px 10px #e74c3c';
			} else {
				statusEl.style.color = '#f1c40f';
				statusEl.style.textShadow = '0px 0px 10px #f1c40f';
			}

			this.dealButton.disabled = false;
			this.hitButton.disabled = true;
			this.standButton.disabled = true;
			this.doubleButton.disabled = true;
			this.betIncreaseButton.disabled = false;
			this.betDecreaseButton.disabled = false;

		}

		/*
			Instructions or status of game
		*/
		this.setMessage = function(str){
			document.getElementById('status').innerHTML = str;
		}


	}

	//Exposing the Game.init function
	//to the outside world
	return {
		init: Game.init.bind(Game)
	}

})() 
