import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../components/actions/actions";

function RollTheDice() {
	//Local Variables (useState)
	const [playerScore, setPlayerScore] = useState(0);
	const [cpuScore, setCpuScore] = useState(0);
	const [playerChoice, setPlayerChoice] = useState("");
	const [cpuChoice, setCpuChoice] = useState("");
	const [resultMessage, setResultMessage] = useState(" ");
	const [difficulty, setDifficulty] = useState("Easy");
	const safeZone = 4;

	//Redux (useSelector & dispatch)
	const playerToggleInvincible = useSelector((state) => state.playerInvincible);
	const cpuToggleInvincible = useSelector((state) => state.cpuInvincible);
	const balanceCoins = useSelector((state) => state.balanceCoins);
	const dispatch = useDispatch();

	//UseEffect hooks

	//useEffect Hook -> run the checkForResults() and displayDices() functions everytime the playerChoice/cpuChoice variables are suffering any changes
	useEffect(() => {
		checkForResults();
		displayDices();
		return () => {};
	}, [playerChoice, cpuChoice]);

	//useEffect Hook - > run the updateDifficulty() function in order update the difficulty based on the balance coins
	useEffect(() => {
		updateDifficulty();
		return () => {};
	}, [balanceCoins]);

	//Functions

	//Function that checks for the results after pressing "ROLL", compares the result, increasing the score for the winner of the round and displaying a message based on who won the round
	function checkForResults() {
		if (playerChoice === 0 || cpuChoice === 0) {
			setResultMessage(" ");
		} else if (playerChoice === cpuChoice) {
			setResultMessage("TIE!");
		} else if (balanceCoins > 298 && playerChoice > cpuChoice) {
			setPlayerScore(playerScore + 1);
			setResultMessage("Max Coins reached!");
		} else if (balanceCoins > safeZone && playerChoice < cpuChoice) {
			if (difficulty == "Hard") {
				setResultMessage("You lost this round!");
				dispatch(actions.decrease(2));
			}
			setResultMessage("You lost this round!");
			dispatch(actions.decrease(2));
			setCpuScore(cpuScore + 1);
		} else if (balanceCoins <= safeZone && playerChoice < cpuChoice) {
			setResultMessage("You lost this round!");
			setCpuScore(cpuScore + 1);
		} else if (balanceCoins <= 298 && playerChoice > cpuChoice) {
			setResultMessage("You won this round!");
			setPlayerScore(playerScore + 1);
			dispatch(actions.increase(2));
		}
	}
	//Function that takes the Player/CPU random number and transform it in order to display an ICON of a dice
	function displayDices() {
		const playerPickElement = document.getElementById("playerPick");
		const cpuPickElement = document.getElementById("cpuPick");
		//Conditionals for the Player's Choice

		if (playerChoice == 0) {
			playerPickElement.innerHTML = `YOU rolled: <i class="fas fa-question"></i>`;
		} else if (playerChoice == 1) {
			playerPickElement.innerHTML = `YOU rolled: <i class="fas fa-dice-one"></i>`;
		} else if (playerChoice == 2) {
			playerPickElement.innerHTML = `YOU rolled: <i class="fas fa-dice-two"></i>`;
		} else if (playerChoice == 3) {
			playerPickElement.innerHTML = `YOU rolled: <i class="fas fa-dice-three"></i>`;
		} else if (playerChoice == 4) {
			playerPickElement.innerHTML = `YOU rolled: <i class="fas fa-dice-four"></i>`;
		} else if (playerChoice == 5) {
			playerPickElement.innerHTML = `YOU rolled: <i class="fas fa-dice-five"></i>`;
		} else if (playerChoice == 6) {
			playerPickElement.innerHTML = `YOU rolled: <i class="fas fa-dice-six"></i>`;
		}

		//Conditionals for the CPU's Choice

		if (cpuChoice == 0) {
			cpuPickElement.innerHTML = `CPU rolled: <i class="fas fa-question"></i>`;
		} else if (cpuChoice == 1) {
			cpuPickElement.innerHTML = `CPU rolled: <i class="fas fa-dice-one"></i>`;
		} else if (cpuChoice == 2) {
			cpuPickElement.innerHTML = `CPU rolled: <i class="fas fa-dice-two"></i>`;
		} else if (cpuChoice == 3) {
			cpuPickElement.innerHTML = `CPU rolled: <i class="fas fa-dice-three"></i>`;
		} else if (cpuChoice == 4) {
			cpuPickElement.innerHTML = `CPU rolled: <i class="fas fa-dice-four"></i>`;
		} else if (cpuChoice == 5) {
			cpuPickElement.innerHTML = `CPU rolled: <i class="fas fa-dice-five"></i>`;
		} else if (cpuChoice == 6) {
			cpuPickElement.innerHTML = `CPU rolled: <i class="fas fa-dice-six"></i>`;
		}
	}
	//Function that updates the Difficulty of the game based on the Balance Coins
	const updateDifficulty = () => {
		if (balanceCoins >= 8) {
			setDifficulty("Hard");
		} else if (balanceCoins >= 6) {
			setDifficulty("Medium");
		} else if (balanceCoins <= safeZone) {
			setDifficulty("Easy");
		}
	};

	return (
		<div className="rollTheDice-wrapper">
			<h4>Roll the Dice !</h4>
			<h5>Scoreboard</h5>
			<div className="score-div">
				<h5>Player - {playerScore}</h5>
				<h5>{cpuScore} - CPU</h5>
			</div>
			<div className="difficulty-div">
				<h5>
					Difficulty: <span>{difficulty}</span>
				</h5>

				<a
					onClick={() => {
						const difficultyDiv = document.querySelector(".difficulty-info");
						difficultyDiv.style.transform = "scale(1)";
						difficultyDiv.style.opacity = 1;
					}}
				>
					<i className="fas fa-info"></i>
				</a>

				<div className="difficulty-info">
					<h5>Easy Difficulty</h5>
					<small>
						- <strong>NO</strong> penalty per round lost if the Coin balance is
						less than 5
					</small>

					<h5>Medium Difficulty</h5>
					<small>
						- <strong>2</strong> Coins penalty per round lost if the Coin
						balance is greater than 4
					</small>
					<h5>Hard Difficulty</h5>
					<small>
						- <strong>4</strong> Coins penalty per round lost if the Coin
						balance is greater than 8
					</small>

					<div
						className="x"
						onClick={() => {
							const difficultyDiv = document.querySelector(".difficulty-info");
							difficultyDiv.style.transform = "scale(0)";
							difficultyDiv.style.opacity = 0;
						}}
					>
						<i className="fas fa-times"></i>
					</div>
				</div>
			</div>
			<div className="displayed-results">
				<h4 id="playerPick">YOU rolled: {playerChoice}</h4>
				<h4 id="cpuPick">CPU rolled: {cpuChoice}</h4>
			</div>
			<button
				id="rollBtn"
				onClick={() => {
					if (playerToggleInvincible && cpuToggleInvincible) {
						let number = Math.floor(Math.random() * 6 + 1);
						setPlayerChoice(number);
						setCpuChoice(number);
					} else if (playerToggleInvincible) {
						setCpuChoice(Math.floor(Math.random() * 3 + 1));
						setPlayerChoice(Math.floor(Math.random() * 3 + 4));
					} else if (cpuToggleInvincible) {
						setPlayerChoice(Math.floor(Math.random() * 3 + 1));
						setCpuChoice(Math.floor(Math.random() * 3 + 4));
					} else {
						setCpuChoice(Math.floor(Math.random() * 6 + 1));
						setPlayerChoice(Math.floor(Math.random() * 6 + 1));
					}
				}}
			>
				Roll
			</button>
			<h4>{resultMessage}</h4>
		</div>
	);
}

export default RollTheDice;
