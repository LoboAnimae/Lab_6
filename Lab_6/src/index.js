import React from 'react';
import ReactDOM from 'react-dom';

const EMPTY = "EMPTY"
const initialPositions = [ 
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0
]

const initShownCards = [
		0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0
]
let counter = 0

let cardId = Math.floor(Math.random()*8) + 1

for (const cell in initialPositions){
	let repeater = true;
	while(repeater){
		cardId = Math.floor(Math.random()*8)+1
		if(initialPositions.filter((valor) => valor == cardId).length < 2) {
			initialPositions[cell] = cardId
			repeater = false;
		}
	}
}



function Memory(){
	const restartGame = () => {
		window.location.reload(false);
	}
	
	// Set initial Values
	const [gameStatus, setGameStatus] = React.useState({
		positions: initialPositions,
		winningScore: 0,
		statusGame: false,
		nonHiddenArray: [],
		card1State: 0,
		card1Position: 0,
		card2State: 0,
		card2Position: 0,
		moves: 0,
		shownCards: initShownCards
	})
	
	// Doesn't let one card be selected twice
	if(gameStatus.card1Position == gameStatus.card2Position && gameStatus.card1Position != 0){
		setGameStatus({
			positions: gameStatus.positions,
			winningScore: gameStatus.winningScore,
			statusGame: gameStatus.statusGame,
			nonHiddenArray: gameStatus.nonHiddenArray,
			card1State: gameStatus.card1State,
			card1Position: gameStatus.card1Position,
			card2State: 0,
			card2Position: 0,
			moves: gameStatus.moves +1,
			shownCards: gameStatus.shownCards
		})
	}
	
	// If both cards are equal, and their positions are different, then it lets it be saved
	if(gameStatus.card1State == gameStatus.card2State && gameStatus.card1Position != gameStatus.card2Position){
		if(!(gameStatus.nonHiddenArray.filter((value) => value == gameStatus.card1State).length > 0)){
			let tempArray = gameStatus.nonHiddenArray.concat(gameStatus.card1State)
			console.log(tempArray)
			setGameStatus({
				positions: gameStatus.positions,
				winningScore: gameStatus.winningScore +1,
				statusGame: gameStatus.statusGame,
				nonHiddenArray: tempArray,
				card1State: 0,
				card1Position: 0,
				card2State: 0,
				card2Position: 0,
				moves: gameStatus.moves +1,
				shownCards: gameStatus.shownCards
			}
									 )
		}
		else{
			setGameStatus({
				positions: gameStatus.positions,
				winningScore: gameStatus.winningScore,
				statusGame: gameStatus.statusGame,
				nonHiddenArray: gameStatus.nonHiddenArray,
				card1State: 0,
				card1Position: 0,
				card2State: 0,
				card2Position: 0,
				moves: gameStatus.moves,
				shownCards: gameStatus.shownCards
			}
			
									 )
		}
	}
	
	// If both cards are not equal, then it resets them
	if(gameStatus.card1State != 0 && gameStatus.card2State != 0 && gameStatus.card1State != gameStatus.card2State){
		console.log('Not equal!')
		{setTimeout(()=>{
			let tempArray = gameStatus.shownCards
			tempArray[gameStatus.card1Position - 1] = 0
			tempArray[gameStatus.card2Position - 1] = 0
			setGameStatus(
				{
					positions: gameStatus.positions,
					winningScore: gameStatus.winningScore,
					statusGame: gameStatus.statusGame,
					nonHiddenArray: gameStatus.nonHiddenArray,
					card1State: 0,
					card1Position: 0,
					card2State: 0,
					card2Position: 0,
					moves: gameStatus.moves + 1,
					shownCards: tempArray
				}
			)
		}, 400)}
		
	}
	
	if(gameStatus.nonHiddenArray.length == 8 && !(gameStatus.statusGame)){
		console.log('Won!')
		{setTimeout(()=>{
			setGameStatus({
				positions: gameStatus.positions,
				winningScore: gameStatus.winningScore,
				statusGame: true,
				nonHiddenArray: gameStatus.nonHiddenArray,
				card1State: gameStatus.card1State,
				card1Position: gameStatus.card1Position,
				card2State: gameStatus.card2State,
				card2Position: gameStatus.card2Position,
				moves: gameStatus.moves,
				shownCards: gameStatus.shownCards
			})
		},
		1200)}
		
	}
	// Take a turn
	function takeTurn(position, cardClicked){
		let tempArray = gameStatus.shownCards
		tempArray[position-1] = 1
		// Change state of first card
		if(gameStatus.card1State == 0){
			setGameStatus({
				positions: gameStatus.positions,
				winningScore: gameStatus.winningScore,
				statusGame: gameStatus.statusGame,
				nonHiddenArray: gameStatus.nonHiddenArray,
				card1State: cardClicked,
				card1Position: position,
				card2State: gameStatus.card2State,
				card2Position: gameStatus.card2Position,
				moves: gameStatus.moves,
				shownCards: tempArray
			})
		}
		else {		
			setGameStatus({
				positions: gameStatus.positions,
				winningScore: gameStatus.winningScore,
				statusGame: gameStatus.statusGame,
				nonHiddenArray: gameStatus.nonHiddenArray,
				card1State: gameStatus.card1State,
				card1Position: gameStatus.card1Position,
				card2State: cardClicked,
				card2Position: position,
				moves: gameStatus.moves,
				shownCards: gameStatus.shownCards
				}
										 )
			
		}
	}
	
	return (
		<div id="mainContainer">
			{!gameStatus.statusGame && <div id="menu"> <button id="preRestart" onClick={restartGame}> Restart </button>
				<div id="score"> Moves: {gameStatus.moves}</div> </div>}
			{!gameStatus.statusGame && <h1 id="title"> Memory </h1>}
			{!gameStatus.statusGame && <div className="grid">
				{!gameStatus.statusGame && <Card position={1} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={2} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={3} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={4} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={5} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={6} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={7} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				 {!gameStatus.statusGame && <Card position={8} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={9} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={10} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={11} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={12} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={13} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={14} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={15} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
				{!gameStatus.statusGame && <Card position={16} value={gameStatus.positions} handleClick={takeTurn} hiddenValue={gameStatus.shownCards}/>}
			</div>}
			{gameStatus.statusGame && 
				<div id="winningContainer"> 
					<div id="winningScreen"> You won in <br /><div id="moveset">{gameStatus.moves}</div> moves! 
				</div> <br />
				<button onClick={restartGame} id="restartButton"> Restart </button> 
			</div>}
            <div id='attribution'>
            Image by <a href="https://pixabay.com/users/AnnaliseArt-7089643/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4939905">Annalise Batista</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4939905">Pixabay</a>
            </div>
        </div>
	)
}

function Card(props){
	return(
	<div className="card" onClick={() => props.handleClick(props.position, props.value[props.position-1])}>
			<div id="CardText"> 
				
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 1 && <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9c3f2776-a0a3-4d35-b164-aa70f5c9d2b0/d3flo4l-2356fb7c-fb2e-4f5d-84df-a1271079ebd6.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzljM2YyNzc2LWEwYTMtNGQzNS1iMTY0LWFhNzBmNWM5ZDJiMFwvZDNmbG80bC0yMzU2ZmI3Yy1mYjJlLTRmNWQtODRkZi1hMTI3MTA3OWViZDYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.W2UwQdDumvpO1dwvy4Qqnx3PjTrEc7y_J3OB_pwrShA' />}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 2 && <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7cdd0366-8c6d-41aa-b425-cb5dccb330dd/d343tqf-dd747ac5-6222-4111-a9cc-d84741983b43.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZGQwMzY2LThjNmQtNDFhYS1iNDI1LWNiNWRjY2IzMzBkZFwvZDM0M3RxZi1kZDc0N2FjNS02MjIyLTQxMTEtYTljYy1kODQ3NDE5ODNiNDMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FqSx1ZrMNqibkQ4N4Y2sWOYwMx2VGxcwM3DNDmOBV70' />}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 3 && <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dace91da-5c97-4c30-9602-afabbcd57695/d3k0hh4-3bb7b263-51ae-4d04-9a62-e1745799e357.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RhY2U5MWRhLTVjOTctNGMzMC05NjAyLWFmYWJiY2Q1NzY5NVwvZDNrMGhoNC0zYmI3YjI2My01MWFlLTRkMDQtOWE2Mi1lMTc0NTc5OWUzNTcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.w4_SwwKhfCOV9OqbYk0lA18xCS4ZGVPEscLxDYCEDnM' />}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 4 && <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f54a63cf-1e53-4808-9008-edd78c94128e/d34k6ny-e46f1f52-7156-4317-82c7-86348df174c0.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1NGE2M2NmLTFlNTMtNDgwOC05MDA4LWVkZDc4Yzk0MTI4ZVwvZDM0azZueS1lNDZmMWY1Mi03MTU2LTQzMTctODJjNy04NjM0OGRmMTc0YzAuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-zy6ohtDUDopuutTuLaY8UJ5qh-HDklkWNvIlWmpY3g' />}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 5 && <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f54a63cf-1e53-4808-9008-edd78c94128e/d34k650-6bb09377-4285-48dc-9e8e-fb2a78718d77.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1NGE2M2NmLTFlNTMtNDgwOC05MDA4LWVkZDc4Yzk0MTI4ZVwvZDM0azY1MC02YmIwOTM3Ny00Mjg1LTQ4ZGMtOWU4ZS1mYjJhNzg3MThkNzcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.awQY1DsHCJLyzSA8vvTMf1YNb2cT_eMixDkhiE8NXzc' />}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 6 && <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9a9cf6b8-e5b8-4b32-bc3a-8e4873808984/d4nuc9f-98557068-6bc9-419e-aa14-69671fea8506.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhOWNmNmI4LWU1YjgtNGIzMi1iYzNhLThlNDg3MzgwODk4NFwvZDRudWM5Zi05ODU1NzA2OC02YmM5LTQxOWUtYWExNC02OTY3MWZlYTg1MDYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.OXnih3NyAN44TkZgsHqGLSv0_maVKE0rYfqbAaIA_rc' />}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 7 && <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9a9cf6b8-e5b8-4b32-bc3a-8e4873808984/d4yrutn-b4a5e1fe-e0cc-4a11-9d44-556a058be0e6.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhOWNmNmI4LWU1YjgtNGIzMi1iYzNhLThlNDg3MzgwODk4NFwvZDR5cnV0bi1iNGE1ZTFmZS1lMGNjLTRhMTEtOWQ0NC01NTZhMDU4YmUwZTYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.LeyJeOzcym-5tMo6tkwKVTwEFs83uepsH0-JjEFvUIE' />}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 8 && <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f54a63cf-1e53-4808-9008-edd78c94128e/d34k67v-9b0c4efa-8ae8-4c71-b691-86753881a9d7.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1NGE2M2NmLTFlNTMtNDgwOC05MDA4LWVkZDc4Yzk0MTI4ZVwvZDM0azY3di05YjBjNGVmYS04YWU4LTRjNzEtYjY5MS04Njc1Mzg4MWE5ZDcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.MX_wP8hoeUZvzkiLJkTIjFLagh2guRQkYcs627CAFE4' />}
			</div>
		
	</div>
	)
}

ReactDOM.render(
	<Memory />,
    document.getElementById('app'))