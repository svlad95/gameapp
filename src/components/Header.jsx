import React, { useState } from "react";
import { Link } from "react-router-dom";
import dicePng from "../assets/dice.png";
import rockpaperscissorsPng from "../assets/rockpaperscissors.png";
import secretnumberPng from "../assets/secretnumber.png";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../components/actions/actions";

function Header() {
	//Redux (useSelector & dispatch)
	const balanceCoins = useSelector((state) => state.balanceCoins);
	const secretNumber = useSelector((state) => state.secretNumber);
	const SECRETNUMBER_GAMESTATE = useSelector(
		(state) => state.SECRETNUMBER_GAMESTATE
	);
	const ROCKPAPERSCISSORS_GAMESTATE = useSelector(
		(state) => state.ROCKPAPERSCISSORS_GAMESTATE
	);
	const dispatch = useDispatch();

	//Local Variables (useState)
	const [lightMode, setLightMode] = useState(true);

	return (
		<>
			<header>
				<div className="balance-info">
					<h3>
						Balance: {balanceCoins} <i className="fas fa-coins"></i>
					</h3>

					<div className="icons">
						<Link
							to="/"
							onClick={() => {
								dispatch(actions.SECRETNUMBER_GAMESTATE_OFF());
								dispatch(actions.ROCKPAPERSCISSORS_GAMESTATE_OFF());
								dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
								dispatch(actions.displayedMessage(" "));
							}}
						>
							<i className="fas fa-info-circle"></i>
						</Link>
						<Link
							to="/debug"
							onClick={() => {
								dispatch(actions.SECRETNUMBER_GAMESTATE_OFF());
								dispatch(actions.ROCKPAPERSCISSORS_GAMESTATE_OFF());
								dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
								dispatch(actions.displayedMessage(" "));
							}}
						>
							<i className="fas fa-code"></i>
						</Link>
						<i
							className={lightMode ? "fas fa-moon" : "fas fa-sun"}
							onClick={() => {
								switchToDarkMode();
								function switchToDarkMode() {
									const contentDiv = document.getElementById("content");

									if (lightMode) {
										contentDiv.classList.add("dark");
									} else {
										contentDiv.classList.remove("dark");
									}
								}
								setLightMode(!lightMode);
							}}
						></i>
					</div>
				</div>
				<div className="games-list">
					<div className="game-selector rollTheDice">
						<img src={dicePng} alt="" />
						<Link
							to="/RollTheDice"
							onClick={() => {
								dispatch(actions.SECRETNUMBER_GAMESTATE_OFF());
								dispatch(actions.ROCKPAPERSCISSORS_GAMESTATE_OFF());
								dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
								dispatch(actions.displayedMessage(" "));
							}}
						>
							Play
						</Link>
					</div>
					<div
						className={
							balanceCoins >= 10
								? "game-selector secretnumber"
								: "game-selector secretnumber unavailable"
						}
					>
						<img src={secretnumberPng} alt="" />
						<Link
							to={balanceCoins >= 10 ? "/SecretNumber" : "/cheater"}
							onClick={() => {
								if (balanceCoins >= 10 && !SECRETNUMBER_GAMESTATE) {
									dispatch(actions.decrease(10));
									dispatch(actions.SECRETNUMBER_GAMESTATE_ON());
									dispatch(actions.randomize(secretNumber));
									dispatch(actions.resetSecretNumberAttempts());
									dispatch(actions.ROCKPAPERSCISSORS_GAMESTATE_OFF());
									dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_OFF());
									dispatch(actions.displayedMessage(" "));
								}
							}}
						>
							Play
						</Link>
						<span className="funds-tooltip">Insuficient Funds</span>
					</div>
					<div
						className={
							balanceCoins >= 30
								? "game-selector rockpaperscissors"
								: "game-selector rockpaperscissors unavailable"
						}
					>
						<img src={rockpaperscissorsPng} alt="" />
						<Link
							to={balanceCoins >= 30 ? "/RockPaperScissors" : "/cheater"}
							onClick={() => {
								if (balanceCoins >= 30 && !ROCKPAPERSCISSORS_GAMESTATE) {
									dispatch(actions.decrease(30));
									dispatch(actions.ROCKPAPERSCISSORS_GAMESTATE_ON());
									dispatch(actions.ROCKPAPERSCISSORS_ROUNDSTATE_ON());
									dispatch(actions.SECRETNUMBER_GAMESTATE_OFF());
									dispatch(actions.displayedMessage(" "));
								}
							}}
						>
							Play
						</Link>
						<span className="funds-tooltip">Insuficient Funds</span>
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;
