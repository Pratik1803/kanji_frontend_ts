import { Button, Stack } from "@mui/material";
import React, { useState, createContext, useEffect } from "react";
import Styles from "./App.module.scss";
import Answer from "./Components/AnswerComp/Answer";
import Kanji from "./Components/KanjiComp/Kanji";
import Context from "./Interfaces/Components.interface";
import KanjiResponse from "./Interfaces/KanjiResponse.interface";
import axios from "axios";
import { Routes, Route, NavLink } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";

const StatesContext = createContext<Context>({
	states: {
		showAns: false,
		currentWord: 0,
		wordIndexShifter: 0,
		data: [
			{
				word: "",
				meaning: "",
				level: 0,
				on_reading: {
					reading: "",
					example: {
						eg: "",
						meaning: "",
						pronounciation: "",
					},
				},
				kun_reading: {
					reading: "",
					example: {
						eg: "",
						meaning: "",
						pronounciation: "",
					},
				},
			},
		],
	},
	setStates: () => {},
});

function App() {
	const [states, setStates] = useState({
		showAns: false,
		currentWord: 0,
		wordIndexShifter: 0,
		data: [
			{
				word: "",
				meaning: "",
				level: 0,
				on_reading: {
					reading: "",
					example: {
						eg: "",
						meaning: "",
						pronounciation: "",
					},
				},
				kun_reading: {
					reading: "",
					example: {
						eg: "",
						meaning: "",
						pronounciation: "",
					},
				},
			},
		],
	});

	return (
		<StatesContext.Provider value={{ states, setStates }}>
			<Routes>
				<Route
					path="/kanji_frontend_ts"
					element={
						<Home/>
					}
				/>
				<Route path="/kanji_frontend_ts/login" element={<Login />} />
				<Route path="/kanji_frontend_ts/signup" element={<Signup />} />
			</Routes>
		</StatesContext.Provider>
	);
}

export default App;
export { StatesContext };
