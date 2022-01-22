import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./components/reducers/allReducers";

//STORE
let myStore = createStore(allReducers);
// For the Redux debug tool
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={myStore}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("content")
);
