import React from "react";
import { useSelector } from "react-redux";

function CheatMessage() {
	const balanceCoins = useSelector((state) => state.balanceCoins);
	return (
		<div className="cheat-message">
			<h2>
				Say <span>NO</span> to cheating!
			</h2>
			<h3>Win more coins to unlock this game!</h3>

			<h3>
				Your balance: {balanceCoins} <i className="fas fa-coins"></i>
			</h3>
		</div>
	);
}

export default CheatMessage;
