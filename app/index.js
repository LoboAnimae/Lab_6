import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
		}, 500)}
		
	}
	
	if(gameStatus.nonHiddenArray.length == 8 && !(gameStatus.statusGame)){
		console.log('Won!')
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
				
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 1 && props.value[props.position-1]}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 2 && props.value[props.position-1]}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 3 && props.value[props.position-1]}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 4 && props.value[props.position-1]}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 5 && props.value[props.position-1]}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 6 && props.value[props.position-1]}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 7 && props.value[props.position-1]}
				{props.hiddenValue[props.position-1] == 1 && props.value[props.position-1] == 8 && props.value[props.position-1]}
			</div>
		
	</div>
	)
}

ReactDOM.render(
	<Memory />,
    document.getElementById('app'))