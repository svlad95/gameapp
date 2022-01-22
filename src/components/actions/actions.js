//Balance coins Actions
export const increase = (number) => {
	return {
		type: "INCREASE",
		payload: number,
	};
};
export const decrease = (number) => {
	return {
		type: "DECREASE",
		payload: number,
	};
};
export const reset = (number) => {
	return {
		type: "RESET",
		payload: number,
	};
};

//Roll the dice Actions
export const turnPlayerInvincibleOn = () => {
	return {
		type: "TURN_ON_PLAYER",
	};
};
export const turnCpuInvincibleOn = () => {
	return {
		type: "TURN_ON_CPU",
	};
};

export const turnPlayerInvincibleOff = () => {
	return {
		type: "TURN_OFF_PLAYER",
	};
};
export const turnCpuInvincibleOff = () => {
	return {
		type: "TURN_OFF_CPU",
	};
};

//Secret Number Actions
export const randomize = () => {
	return {
		type: "RANDOMIZE",
	};
};

export const secretNumberHintOn = () => {
	return {
		type: "TURN_HINT_ON",
	};
};
export const secretNumberHintOff = () => {
	return {
		type: "TURN_HINT_OFF",
	};
};

export const increaseSecretNumberAttempts = (number) => {
	return {
		type: "INCREASE_ATTEMPTS",
		payload: number,
	};
};
export const decreaseSecretNumberAttempts = (number) => {
	return {
		type: "DECREASE_ATTEMPTS",
		payload: number,
	};
};

export const resetSecretNumberAttempts = () => {
	return {
		type: "RESET_ATTEMPTS",
	};
};

//General Actions

export const SECRETNUMBER_GAMESTATE_ON = () => {
	return {
		type: "TURN_SECRETNUMBER_GAME_ON",
	};
};
export const SECRETNUMBER_GAMESTATE_OFF = () => {
	return {
		type: "TURN_SECRETNUMBER_GAME_OFF",
	};
};

export const ROCKPAPERSCISSORS_GAMESTATE_ON = () => {
	return {
		type: "TURN_ROCKGAME_ON",
	};
};
export const ROCKPAPERSCISSORS_GAMESTATE_OFF = () => {
	return {
		type: "TURN_ROCKGAME_OFF",
	};
};

export const ROCKPAPERSCISSORS_ROUNDSTATE_ON = () => {
	return {
		type: "TURN_ROCKGAME_ROUND_ON",
	};
};
export const ROCKPAPERSCISSORS_ROUNDSTATE_OFF = () => {
	return {
		type: "TURN_ROCKGAME_ROUND_OFF",
	};
};

export const displayedMessage = (value) => {
	return {
		type: "DISPLAY_MESSAGE",
		payload: value,
	};
};
//Randomize CPU choice for the rock paper scissors
export const randomizeCpuChoice = (value) => {
	return {
		type: "RANDOMIZE_CPU_CHOICE",
		payload: value,
	};
};

export const TURN_ON_CPU_PICKS_ONLY_PAPER = () => {
	return {
		type: "TURN_ON_CPU_PICKS_ONLY_PAPER",
	};
};
export const TURN_OFF_CPU_PICKS_ONLY_PAPER = () => {
	return {
		type: "TURN_OFF_CPU_PICKS_ONLY_PAPER",
	};
};
