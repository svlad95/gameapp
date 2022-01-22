import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../components/actions/actions";
import { useNavigate } from "react-router-dom";

function RockPaperScissors() {
	//Redux (useSelector & dispatch)
	const displayMessage = useSelector((state) => state.displayMessage);
	const balanceCoins = useSelector((state) => state.balanceCoins);
	const ROCKPAPERSCISSORS_ROUNDSTATE = useSelector(
		(state) => state.ROCKPAPERSCISSORS_ROUNDSTATE
	);
	const ROCKPAPERSCISSORS_GAMESTATE = useSelector(
		(state) => state.ROCKPAPERSCISSORS_GAMESTATE
	);
	const cpuChoice = useSelector((state) => state.randomizeCpuChoice);
	const cpuPicksOnlyPaper = useSelector((state) => state.cpuPicksOnlyPaper);
	const dispatch = useDispatch();

	//Local Variables (useState)
	const [playerScore, setPlayerScore] = useState(0);
	const [cpuScore, setCpuScore] = useState(0);
	const [playerChoice, setPlayerChoice] = useState(0);
	let choices = ["rock", "paper", "scissors"];

	//useNavigate
	let navigate = useNavigate();

	//Functions

	//Function that run the necessary checks each round
	function checkRockPaperScissorsResults() {
		const message = document.querySelector(".message");

		if (playerChoice === 0) {
			dispatch(actions.displayedMessage("Please select an option!"));
			message.style.color = "red";
		} else {
			message.style.color = "#2c3e50";

			//Check if TIE
			if (playerChoice === cpuChoice) {
				dispatch(actions.displayedMessage("Tie!"));
				dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
			}

			//Check if CPU Wins
			else if (playerChoice === 1 && cpuChoice === 2) {
				dispatch(actions.displayedMessage("CPU won this round!"));
				setCpuScore(cpuScore + 1);
				dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
			} else if (playerChoice === 2 && cpuChoice === 3) {
				dispatch(actions.displayedMessage("CPU won this round!"));
				setCpuScore(cpuScore + 1);
				dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
			} else if (playerChoice === 3 && cpuChoice === 1) {
				dispatch(actions.displayedMessage("CPU won this round!"));
				setCpuScore(cpuScore + 1);
				dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
			}

			//Check if Player wins
			else if (playerChoice === 1 && cpuChoice === 3) {
				dispatch(actions.displayedMessage("You won this round!"));
				setPlayerScore(playerScore + 1);
				dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
			} else if (playerChoice === 2 && cpuChoice === 1) {
				dispatch(actions.displayedMessage("You won this round!"));
				setPlayerScore(playerScore + 1);
				dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
			} else if (playerChoice === 3 && cpuChoice === 2) {
				dispatch(actions.displayedMessage("You won this round!"));
				setPlayerScore(playerScore + 1);
				dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
			}

			decideCpuChoice();
		}
	}

	//Decide the CPu choice and transforming the results into icons
	function decideCpuChoice() {
		const cpuPickIcon = document.getElementById("cpuPick");

		if (cpuChoice === 0) {
			cpuPickIcon.style.visibility = "hidden";
		} else if (cpuChoice === 1) {
			cpuPickIcon.className = "fas fa-hand-rock";
			cpuPickIcon.style.visibility = "visible";
		} else if (cpuChoice === 2) {
			cpuPickIcon.className = "fas fa-hand-paper";
			cpuPickIcon.style.visibility = "visible";
		} else if (cpuChoice === 3) {
			cpuPickIcon.className = "fas fa-hand-scissors";
			cpuPickIcon.style.visibility = "visible";
		}
	}

	//useEffect Hooks

	//UseEffect hook to check for flawless wins, wins, flawless losses and losses (need to refresh as soon as cpuscore/playerscore is changing, no on click)
	useEffect(() => {
		if (playerScore === 3 && cpuScore === 0) {
			dispatch(actions.displayedMessage("Flawless win!"));
			dispatch(actions.increase(100));
			dispatch(actions.ROCKPAPERSCISSORS_GAMESTATE_OFF());
			dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
		}
		//Check for normal win
		else if (playerScore === 3) {
			dispatch(actions.displayedMessage("You won!!"));
			dispatch(actions.increase(50));
			dispatch(actions.ROCKPAPERSCISSORS_GAMESTATE_OFF());
			dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
		}
		//Check for Flawless lose
		else if (playerScore === 0 && cpuScore === 3) {
			dispatch(actions.displayedMessage("Flawless loser!"));
			dispatch(actions.ROCKPAPERSCISSORS_GAMESTATE_OFF());
			dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
			dispatch(actions.reset(0));
		}
		//Check for normal lose
		else if (cpuScore === 3) {
			dispatch(actions.displayedMessage("You lost!!"));
			dispatch(actions.ROCKPAPERSCISSORS_GAMESTATE_OFF());
			dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
		}
		return () => {};
	}, [playerScore, cpuScore]);

	//UseEffect hook to check the state of the cpuChoice and if the debug setting for the game is turned on
	useEffect(() => {
		if (cpuPicksOnlyPaper) {
			dispatch(actions.randomizeCpuChoice(2));
		} else {
			dispatch(actions.randomizeCpuChoice(Math.floor(Math.random() * 3) + 1));
		}
		return () => {};
	}, [cpuPicksOnlyPaper]);

	return (
		<div className="rockPaperScissors-wrapper">
			<h4>Rock, Paper & Scissors (Best of 5)</h4>
			<h5>Score</h5>
			<div className="score-div">
				<h6>Player - {playerScore}</h6>
				<h6>{cpuScore} - CPU</h6>
			</div>
			<h5>Player's Pick</h5>
			<div id="playerPickForm">
				<div className="options">
					{choices.map((choice) => (
						<React.Fragment key={choice}>
							<div className="form-group">
								<i className={`fas fa-hand-${choice}`}></i>
								<input
									type="radio"
									className="option"
									id={choice}
									name="option"
									value={choice}
									onChange={(e) => {
										if (e.target.value === choices[0]) {
											setPlayerChoice(1);
										} else if (e.target.value === choices[1]) {
											setPlayerChoice(2);
										} else if (e.target.value === choices[2]) {
											setPlayerChoice(3);
										}
									}}
								></input>
							</div>
						</React.Fragment>
					))}
				</div>
				<button
					className={
						ROCKPAPERSCISSORS_ROUNDSTATE
							? "select-play-btn"
							: "select-play-btn inactive"
					}
					id="select-play-btn"
					onClick={() => {
						if (!ROCKPAPERSCISSORS_ROUNDSTATE) {
							if (balanceCoins < 30) {
								navigate("/cheater");
							} else {
								const playAgainBtn = document.querySelector(".select-play-btn");
								playAgainBtn.className = "select-play-btn inactive";
							}
						} else {
							checkRockPaperScissorsResults();
						}
					}}
				>
					Select & Play
				</button>
			</div>
			<h5>CPU's Pick</h5>
			<i className="fas fa-hand-rock" id="cpuPick"></i>
			<h5 className="message">{displayMessage}</h5>
			<div className="buttons-div">
				<button
					className={
						ROCKPAPERSCISSORS_GAMESTATE
							? "play-again-btn inactive"
							: "play-again-btn"
					}
					onClick={() => {
						if (balanceCoins >= 30) {
							if (ROCKPAPERSCISSORS_GAMESTATE) {
								// navigate("/RockPaperScissors")
								const playAgainBtn = document.querySelector(".play-again-btn");
								playAgainBtn.className = "play-again-btn inactive";
							} else {
								dispatch(actions.decrease(30));
								dispatch(actions.displayedMessage(" "));
								if (cpuPicksOnlyPaper) {
									dispatch(actions.randomizeCpuChoice(2));
								} else {
									dispatch(
										actions.randomizeCpuChoice(
											Math.floor(Math.random() * 3) + 1
										)
									);
								}
								setCpuScore(0);
								setPlayerScore(0);
								dispatch(actions.ROCKPAPERSCISSORS_GAMESTATE_ON());
								dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_ON());
								const cpuPickIcon = document.getElementById("cpuPick");
								cpuPickIcon.style.visibility = "hidden";
							}
						} else {
							if (balanceCoins < 30 && ROCKPAPERSCISSORS_GAMESTATE) {
								navigate("/cheater");
							} else {
								dispatch(actions.ROCKPAPERSCISSORS_GAMESTATE_OFF());
								const play_again_btn =
									document.querySelector(".play-again-btn");
								play_again_btn.classList.add("inactive");
								play_again_btn.textContent = "Not Enough Coins";
							}
						}
					}}
				>
					Play Again
				</button>
				<button
					className={
						ROCKPAPERSCISSORS_ROUNDSTATE || !ROCKPAPERSCISSORS_GAMESTATE
							? "new-round-btn inactive"
							: "new-round-btn"
					}
					onClick={() => {
						const newRoundBtn = document.querySelector(".new-round-btn");
						if (!ROCKPAPERSCISSORS_ROUNDSTATE && !ROCKPAPERSCISSORS_GAMESTATE) {
							newRoundBtn.className = "new-round-btn inactive";
						} else if (ROCKPAPERSCISSORS_ROUNDSTATE) {
							newRoundBtn.className = "new-round-btn inactive";
						} else {
							dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_ON());
							dispatch(actions.displayedMessage(" "));
							if (cpuPicksOnlyPaper) {
								dispatch(actions.randomizeCpuChoice(2));
							} else {
								dispatch(
									actions.randomizeCpuChoice(Math.floor(Math.random() * 3) + 1)
								);
							}

							const cpuPickIcon = document.getElementById("cpuPick");
							cpuPickIcon.style.visibility = "hidden";
						}
					}}
				>
					New Round
				</button>
			</div>
		</div>
	);
}

export default RockPaperScissors;
