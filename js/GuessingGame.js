function Game() {
	this.winningNumber = generateWinningNumber()
	this.playersGuess = null
	this.pastGuesses = []
}

Game.prototype.playersGuessSubmission = function(num) {
	if (!Number.isInteger(num) || num < 1 || num > 100) {
		throw 'That is an invalid guess.'
	}
	
	this.playersGuess = num

	return this.checkGuess(num)
}

Game.prototype.checkGuess = function(num) {
	if (num === this.winningNumber) {
		return 'You Win!'
	}

	if (this.pastGuesses.includes(num)) {
		return 'You have already guessed that number.'
	} else {
		this.pastGuesses.push(num)
		
		if (this.pastGuesses.length === 5) {
			return 'You Lose.'
		}

		var diff = this.difference()

		if (diff < 10) {
			return 'You\'re burning up!'
		} else if (diff < 25) {
			return 'You\'re lukewarm.'
		} else if (diff < 50) {
			return 'You\'re a bit chilly.'
		} else {
			return 'You\'re ice cold!'
		}
	}
}

Game.prototype.difference = function() {
	return Math.abs(this.playersGuess - this.winningNumber)
}

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber
}

Game.prototype.provideHint = function() {
	return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()])
}

function generateWinningNumber() {
	return Math.floor(Math.random() * 100 + 1)
}

function newGame() {
	return new Game()
}

function shuffle(ary) {
	var aryLength = ary.length

	while (aryLength) {
		var i = Math.floor(Math.random() * aryLength--)
		var temp = ary[aryLength]
		ary[aryLength] = ary[i]
		ary[i] = temp
	}

	return ary
}