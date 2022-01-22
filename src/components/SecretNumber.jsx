import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../components/actions/actions";
import { useNavigate } from "react-router-dom";

function SecretNumber() {
	//Redux (useSelector & dispatch)
	const secretNumber = useSelector((state) => state.secretNumber);
	const balanceCoins = useSelector((state) => state.balanceCoins);
	const secretNumberHint = useSelector((state) => state.secretNumberHint);
	const SECRETNUMBER_GAMESTATE = useSelector(
		(state) => state.SECRETNUMBER_GAMESTATE
	);
	const displayMessage = useSelector((state) => state.displayMessage);
	const totalAttempts = useSelector((state) => state.secretNumberAttempts);
	const dispatch = useDispatch();

	//Local Variables (useState,useNavigate hooks)
	let navigate = useNavigate();
	const [readonlyInput, setReadonlyInput] = useState(false);

	//UseEffect hooks
	//UseEffect that adds the inactive class to the playAgain button when the secret number gamestate changes
	useEffect(() => {
		if (SECRETNUMBER_GAMESTATE && balanceCoins < 10) {
			const play_again_btn = document.querySelector(".play-again-btn");
			play_again_btn.classList.add("inactive");
		}
		return () => {};
	}, [SECRETNUMBER_GAMESTATE]);

	//Functions
	//Function to check the results of the game
	function checkSecretNumberResults() {
		const secretNumberInput = Number(
			document.getElementById("secretNumberInput").value
		);
		const errorMessage = document.querySelector(".error-message");

		if (!SECRETNUMBER_GAMESTATE) {
			if (balanceCoins < 10) {
				navigate("/cheater");
			} else {
				const guessBtn = document.getElementById("guessButton");
				guessBtn.className = "guess-btn inactive";
			}
		} else {
			if (secretNumberInput === 0) {
				errorMessage.style.visibility = "visible";
			} else if (secretNumberInput === secretNumber) {
				if (totalAttempts === 2) {
					dispatch(actions.displayedMessage("Flawless Win!"));
					dispatch(actions.increase(50));
					errorMessage.style.visibility = "hidden";
					dispatch(actions.SECRETNUMBER_GAMESTATE_OFF());
				} else {
					dispatch(actions.displayedMessage("You won!"));
					dispatch(actions.increase(20));
					errorMessage.style.visibility = "hidden";
					dispatch(actions.SECRETNUMBER_GAMESTATE_OFF());
				}
			} else if (totalAttempts < 1) {
				if (totalAttempts === -1) {
				} else {
					dispatch(actions.decreaseSecretNumberAttempts(1));
					dispatch(
						actions.displayedMessage(
							`You lost! The Secret Number was ${secretNumber}`
						)
					);
					setReadonlyInput(true);
					dispatch(actions.SECRETNUMBER_GAMESTATE_OFF());
					errorMessage.style.visibility = "hidden";
				}
			} else if (secretNumberInput > secretNumber) {
				if (totalAttempts >= 1) {
					dispatch(actions.decreaseSecretNumberAttempts(1));
					dispatch(actions.displayedMessage("Hint: Smaller"));
					errorMessage.style.visibility = "hidden";
				}
			} else if (secretNumberInput < secretNumber) {
				if (totalAttempts >= 1) {
					dispatch(actions.decreaseSecretNumberAttempts(1));
					dispatch(actions.displayedMessage("Hint: Bigger"));
					errorMessage.style.visibility = "hidden";
				}
			}
		}
	}

	return (
		<div className="secretNumber-wrapper">
			<h4>Guess the secret number</h4>
			<p>
				The CPU has chosen a number between <strong>1</strong> and{" "}
				<strong>10</strong>. You only have <strong>3</strong> attempts to guess.
				Which is it?
			</p>
			<h5>Introduce the number below</h5>
			<div id="guessForm">
				<input
					type="text"
					placeholder="?"
					id="secretNumberInput"
					maxLength="1"
					readOnly={readonlyInput}
					onKeyPress={(event) => {
						if (!/[0-9]/.test(event.key)) {
							event.preventDefault();
						}
					}}
				/>

				<p className="error-message">Invalid number selected!</p>
				<div className="guess-btn-wrapper">
					<button
						type="submit"
						id="guessButton"
						className={
							SECRETNUMBER_GAMESTATE ? "guess-btn" : "guess-btn inactive"
						}
						onClick={() => {
							checkSecretNumberResults();
						}}
					>
						Guess
					</button>
				</div>
			</div>
			<h6>
				Attempts left:{" "}
				{totalAttempts !== 0
					? `${totalAttempts + 1}`
					: `${totalAttempts + 1} (Last Chance!)`}
			</h6>
			{secretNumberHint ? (
				<small className="hint">
					Debug Hint: Between {secretNumber - 1} and {secretNumber + 1}
				</small>
			) : (
				""
			)}
			<h5 className="displayedMessage">{displayMessage}</h5>
			<div className="buttons-div">
				<button
					className={
						SECRETNUMBER_GAMESTATE
							? "play-again-btn inactive"
							: "play-again-btn"
					}
					onClick={() => {
						const play_again_btn = document.querySelector(".play-again-btn");
						if (balanceCoins >= 10) {
							if (SECRETNUMBER_GAMESTATE) {
								// navigate("/SecretNumber");
								play_again_btn.classList.add("inactive");
							} else {
								dispatch(actions.decrease(10));
								dispatch(actions.randomize(secretNumber));
								dispatch(actions.resetSecretNumberAttempts());
								dispatch(actions.SECRETNUMBER_GAMESTATE_ON());
								setReadonlyInput(false);
								dispatch(actions.displayedMessage(" "));
							}
						} else {
							if (balanceCoins < 10 && SECRETNUMBER_GAMESTATE) {
								navigate("/cheater");
							} else {
								dispatch(actions.SECRETNUMBER_GAMESTATE_OFF());

								play_again_btn.classList.add("inactive");
								play_again_btn.textContent = "Not Enough Coins";
							}
						}
					}}
				>
					Play Again
				</button>
			</div>
		</div>
	);
}

export default SecretNumber;
