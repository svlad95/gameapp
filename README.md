# Game-App

### React & Redux web application (with Debug commands)!

##### A web application with 7 components which consists of playing and unlocking every game.

The application has two main features, besides the journey to unlock every game.

- Dark Mode
- Debug tool for testing purposes (May cause minor issues)

This project has been created using Visual Studio Code with the following technologies:

- ReactJS (with JSX)
- CSS / SASS
- Redux State Management

###### Browser compatibility:

-Google Chrome

-Mozila Firefox

-Microsoft Edge

-Opera

-Safari

## ReactJS

- React Hooks

```javascript
//useState hook
const [lightMode, setLightMode] = useState(true);

//useEffect hook
useEffect(() => {
	updateDifficulty();
	return () => {};
}, [balanceCoins]);
```

- React Router

```javascript
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

<Router>
	<Header></Header>
	<Routes>
		<Route exact path="/gameapp/RollTheDice" element={<RollTheDice />}></Route>
		<Route
			exact
			path="/gameapp/secretnumber"
			element={<SecretNumber />}
		></Route>
		...etc
		<Route exact path="/gameapp" element={<Info />}></Route>
	</Routes>
</Router>;
```

```javascript
import { Link } from "react-router-dom";

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
</Link>;
```

```javascript
import { useNavigate } from "react-router-dom";

//useNavigate
	let navigate = useNavigate();

    onClick={() => {
	...somecode
		if (balanceCoins < 30) {
		navigate("/cheater");
		} else {
         ...some code
         }


```

## Redux

- Actions / Reducers

```javascript
//Action
export const secretNumberHintOn = () => {
	return {
		type: "TURN_HINT_ON",
	};
};

//Reducer
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

//Combine Reducers
import { combineReducers } from "redux";

const allReducers = combineReducers({
	balanceCoins: coins,
	...etc,
	secretNumberHint: secretNumberHint,
});

export default allReducers;
```

##

- Store

```javascript
import { createStore } from "redux";
import { Provider } from "react-redux";

let myStore = createStore(allReducers);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={myStore}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("content")
);
```

- Redux Hooks

```javascript
import { useSelector, useDispatch } from "react-redux";

//useSelector
const secretNumberHint = useSelector((state) => state.secretNumberHint);

//useDispatch
const dispatch = useDispatch();

dispatch(actions.SECRETNUMBER_GAMESTATE_OFF());
dispatch(actions.randomizeCpuChoice(Math.floor(Math.random() * 3) + 1));
```
