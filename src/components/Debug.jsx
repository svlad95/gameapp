import React from "react";
import * as actions from "../components/actions/actions";
import { useSelector, useDispatch } from "react-redux";

function Debug() {
	const balanceCoins = useSelector((state) => state.balanceCoins);
	const playerToggleInvincible = useSelector((state) => state.playerInvincible);
	const cpuToggleInvincible = useSelector((state) => state.cpuInvincible);
	const secretNumberHint = useSelector((state) => state.secretNumberHint);
	const cpuPicksOnlyPaper = useSelector((state) => state.cpuPicksOnlyPaper);

	const dispatch = useDispatch();
	return (
		<div className="debug-div">
			<h4>Debug Menu - List of Commands</h4>

			<small>
				<button
					onClick={() => {
						if (balanceCoins <= 290) {
							dispatch(actions.increase(10));
						}
					}}
				>
					+10 Coins
				</button>
				<button
					onClick={() => {
						if (balanceCoins >= 10) {
							dispatch(actions.decrease(10));
						}
					}}
				>
					-10 Coins
				</button>
			</small>
			<small>
				<button
					onClick={() => {
						if (balanceCoins <= 280) {
							dispatch(actions.increase(20));
						}
					}}
				>
					+20 Coins
				</button>
				<button
					onClick={() => {
						if (balanceCoins >= 20) {
							dispatch(actions.decrease(20));
						}
					}}
				>
					-20 Coins
				</button>
			</small>
			<small>
				<button
					onClick={() => {
						if (balanceCoins <= 270) {
							dispatch(actions.increase(30));
						}
					}}
				>
					+30 Coins
				</button>
				<button
					onClick={() => {
						if (balanceCoins >= 30) {
							dispatch(actions.decrease(30));
						}
					}}
				>
					-30 Coins
				</button>
			</small>
			<small>
				<button
					className="resetCoins"
					onClick={() => {
						dispatch(actions.reset(0));
					}}
				>
					Reset
				</button>
				<button
					className="maxCoins"
					onClick={() => {
						dispatch(actions.reset(300));
					}}
				>
					Max Out
				</button>
			</small>
			<h5>Roll the Dice</h5>
			<small>
				Player always win -{" "}
				<button
					className={playerToggleInvincible ? "switch active" : "switch"}
					onClick={() => {
						dispatch(actions.turnPlayerInvincibleOn());
					}}
				>
					ON
				</button>
				<button
					className={!playerToggleInvincible ? "switch inactive" : "switch"}
					onClick={() => {
						dispatch(actions.turnPlayerInvincibleOff());
					}}
				>
					OFF
				</button>
			</small>
			<small>
				    CPU always win - 
				<button
					className={cpuToggleInvincible ? "switch active" : "switch"}
					onClick={() => {
						dispatch(actions.turnCpuInvincibleOn());
					}}
				>
					ON
				</button>
				<button
					className={!cpuToggleInvincible ? "switch inactive" : "switch"}
					onClick={() => {
						dispatch(actions.turnCpuInvincibleOff());
					}}
				>
					OFF
				</button>
			</small>
			<h5>Secret Number</h5>
			<small>
				Secret Number obvious hint -{" "}
				<button
					className={secretNumberHint ? "switch active" : "switch"}
					onClick={() => {
						dispatch(actions.secretNumberHintOn());
					}}
				>
					ON
				</button>
				<button
					className={!secretNumberHint ? "switch inactive" : "switch"}
					onClick={() => {
						dispatch(actions.secretNumberHintOff());
					}}
				>
					OFF
				</button>
			</small>
			<h5>Rock, Paper & Scissors</h5>
			<small>
				CPU picks only "Paper" -{" "}
				<button
					className={cpuPicksOnlyPaper ? "switch active" : "switch"}
					onClick={() => {
						dispatch(actions.TURN_ON_CPU_PICKS_ONLY_PAPER());
					}}
				>
					ON
				</button>
				<button
					className={!cpuPicksOnlyPaper ? "switch inactive" : "switch"}
					onClick={() => {
						dispatch(actions.TURN_OFF_CPU_PICKS_ONLY_PAPER());
					}}
				>
					OFF
				</button>
			</small>
		</div>
	);
}

export default Debug;
