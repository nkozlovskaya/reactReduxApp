import "./index.less";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import { store } from "./redusers";

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
