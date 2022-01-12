import React from "react";
import "./app.less";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./main/Main";
import Card from "./card/Card";
import Error from "./error/Error";

const App = () => {
	return (
		<BrowserRouter>
			<div className="container">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/card/:username/:reponame" element={<Card />} />
					<Route path="*" element={<Main />} />
					<Route path="/error" element={<Error />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
