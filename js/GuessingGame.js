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
		// Added for jQuery
		$('#hint, #submit').prop('disabled', true)
		//
		return 'You Win!'
	} else if (this.pastGuesses.includes(num)) {
		return 'You have already guessed that number.'
	} else {
		this.pastGuesses.push(num)
		$('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess)
		
		if (this.pastGuesses.length === 5) {
			// Added for jQuery
			$('#hint, #submit').prop('disabled', true)
			//
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

$(document).ready(function() {
	var game = new Game()

	function makeGuess(game) {
		var output = game.playersGuessSubmission(+$('#player-input').val())
		$('.title').text(output)
		$('.subtitle').text('You need to guess ' + (game.isLower() ? 'higher.' : 'lower.'))
		$('#player-input').val('')
	}
	
	$('#submit').on('click', function() {
		makeGuess(game)
	})

	$('#player-input').keypress(function(event) {
		if (event.which === 13 && !$('#submit').prop('disabled')) {
			makeGuess(game)
		}
	})

	$('#reset').on('click', function() {
		newGame()
		$('.title').text('Play the Guessing Game!')
		$('.subtitle').text('Guess a number between 1-100!')
		$('.guess').text('-')
		$('#player-input').val('')
		$('#hint, #submit').prop('disabled', false)
	})

	$('#hint').on('click', function() {
		var hints = game.provideHint()
		$('.title').text('The winning number is: ' + hints[0] + ', ' + hints[1] + ', or ' + hints[2] + '.')
	})
})