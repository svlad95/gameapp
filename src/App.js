import "../src/CSS/style.css";
import Header from "./components/Header";
import RollTheDice from "./components/RollTheDice";
import SecretNumber from "./components/SecretNumber";
import CheatMessage from "../src/components/CheatMessage";
import RockPaperScissors from "./components/RockPaperScissors";
import Info from "../src/components/Info";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Debug from "./components/Debug";

function App() {
	return (
		<>
			<Router>
				<Header></Header>
				<Routes>
					<Route
						exact
						path="/gameapp/RollTheDice"
						element={<RollTheDice />}
					></Route>
					<Route
						exact
						path="/gameapp/SecretNumber"
						element={<SecretNumber />}
					></Route>
					<Route
						exact
						path="/gameapp/cheater"
						element={<CheatMessage />}
					></Route>
					<Route
						exact
						path="/gameapp/RockPaperScissors"
						element={<RockPaperScissors />}
					></Route>
					<Route exact path="/gameapp/debug" element={<Debug></Debug>}></Route>
					<Route exact path="/gameapp" element={<Info />}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;

// {x ? () : ()}
