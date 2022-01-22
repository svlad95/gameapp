import React from "react";

function Info() {
	return (
		<div id="infoDiv">
			<h4>Play, Win and Unlock more games!</h4>
			<h5>* Instructions & Additional information *</h5>
			<ul>
				<li>Game 1 (Roll The Dice)</li>
				<small>- Free entry</small>
				<small>- Roll higher than the CPU to win a round</small>
				<small>- Gradually increasing difficulty</small>
				<small>
					- Win to unlock <strong>"Secret Number"</strong> game
				</small>
				<small>
					- Prize: <strong>2 Coins</strong> per round won
				</small>

				<li>Game 2 (Guess the Secret Number)</li>
				<small>
					- Entry fee: <strong>10 Coins</strong>
				</small>
				<small>
					- Total Attempts: <strong>3</strong>
				</small>
				<small>
					- Win to unlock <strong>"Rock, Paper & Scissors"</strong> game
				</small>
				<small>
					- Prize: <strong>20 Coins</strong> (Flawless Win -{" "}
					<strong>50 Coins</strong>)
				</small>

				<li>Game 3 (Rock, Paper & Scissors)</li>
				<small>
					- Entry fee: <strong>30 Coins</strong>
				</small>
				<small>- 5 Rounds (Best of 5)</small>
				<small>
					- Prize: <strong>50 Coins</strong> (Flawless Win -
					<strong> 100 Coins</strong>)
				</small>
				<small>
					- Flawless Loss - Coins will reset to <strong>0</strong>
				</small>
			</ul>
		</div>
	);
}

export default Info;
