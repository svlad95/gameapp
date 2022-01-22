import { combineReducers } from "redux";

//Balance Coins Reducers
const coins = (state = 0, action) => {
	switch (action.type) {
		case "INCREASE":
			return state + action.payload;
		case "DECREASE":
			return state - action.payload;
		case "RESET":
			return (state = action.payload);

		default:
			return state;
	}
};
//Invincible cpu REDUCER
const cpuInvincible = (state = false, action) => {
	switch (action.type) {
		case "TURN_ON_CPU":
			return (state = true);
		case "TURN_OFF_CPU":
			return (state = false);
		default:
			return state;
	}
};
//Invincible player REDUCER
const playerInvincible = (state = false, action) => {
	switch (action.type) {
		case "TURN_ON_PLAYER":
			return (state = true);
		case "TURN_OFF_PLAYER":
			return (state = false);
		default:
			return state;
	}
};

//Secret Number REDUCER
const secretNumber = (state = null, action) => {
	switch (action.type) {
		case "RANDOMIZE":
			return (state = Math.floor(Math.random() * 9 + 1));
		default:
			return state;
	}
};

const secretNumberHint = (state = false, action) => {
	switch (action.type) {
		case "TURN_HINT_ON":
			return (state = true);
		case "TURN_HINT_OFF":
			return (state = false);
		default:
			return state;
	}
};

const SECRETNUMBER_GAMESTATE = (state = false, action) => {
	switch (action.type) {
		case "TURN_SECRETNUMBER_GAME_ON":
			return (state = true);
		case "TURN_SECRETNUMBER_GAME_OFF":
			return (state = false);
		default:
			return state;
	}
};
const ROCKPAPERSCISSORS_GAMESTATE = (state = false, action) => {
	switch (action.type) {
		case "TURN_ROCKGAME_ON":
			return (state = true);
		case "TURN_ROCKGAME_OFF":
			return (state = false);
		default:
			return state;
	}
};

const secretNumberAttempts = (state = 2, action) => {
	switch (action.type) {
		case "INCREASE_ATTEMPTS":
			return state + action.payload;
		case "DECREASE_ATTEMPTS":
			return state - action.payload;
		case "RESET_ATTEMPTS":
			return (state = 2);
		default:
			return state;
	}
};

const displayMessage = (state = " ", action) => {
	switch (action.type) {
		case "DISPLAY_MESSAGE":
			return (state = action.payload);
		default:
			return state;
	}
};

const ROCKPAPERSCISSORS_ROUNDSTATE = (state = false, action) => {
	switch (action.type) {
		case "TURN_ROCKGAME_ROUND_ON":
			return (state = true);
		case "TURN_ROCKGAME_ROUND_OFF":
			return (state = false);
		default:
			return state;
	}
};

const randomizeCpuChoice = (
	state = Math.floor(Math.random() * 3) + 1,
	action
) => {
	switch (action.type) {
		case "RANDOMIZE_CPU_CHOICE":
			return (state = action.payload);
		default:
			return state;
	}
};

const cpuPicksOnlyPaper = (state = false, action) => {
	switch (action.type) {
		case "TURN_ON_CPU_PICKS_ONLY_PAPER":
			return (state = true);
		case "TURN_OFF_CPU_PICKS_ONLY_PAPER":
			return (state = false);
		default:
			return state;
	}
};

//Combine all reducers
const allReducers = combineReducers({
	balanceCoins: coins,
	playerInvincible: playerInvincible,
	cpuInvincible: cpuInvincible,
	secretNumber: secretNumber,
	secretNumberHint: secretNumberHint,
	SECRETNUMBER_GAMESTATE: SECRETNUMBER_GAMESTATE,
	ROCKPAPERSCISSORS_GAMESTATE: ROCKPAPERSCISSORS_GAMESTATE,
	ROCKPAPERSCISSORS_ROUNDSTATE: ROCKPAPERSCISSORS_ROUNDSTATE,
	secretNumberAttempts: secretNumberAttempts,
	displayMessage: displayMessage,
	randomizeCpuChoice: randomizeCpuChoice,
	cpuPicksOnlyPaper: cpuPicksOnlyPaper,
});

export default allReducers;
