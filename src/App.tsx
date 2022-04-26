import { Button } from "@mui/material";
import React, { useState, createContext, useEffect } from "react";
import Styles from "./App.module.scss";
import Answer from "./Components/AnswerComp/Answer";
import Kanji from "./Components/KanjiComp/Kanji";
import Context from "./Interfaces/Components.interface";
import KanjiResponse from "./Interfaces/KanjiResponse.interface";
import axios from "axios";

const StatesContext = createContext<Context>({
	states: {
		showAns: false,
		currentWord: 0,
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
	const [loading, setLoading] = useState<boolean>(false);
	const [states, setStates] = useState({
		showAns: false,
		currentWord: 0,
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

	const getData = async () => {
		setLoading(true);
		try {
			const result = await axios({
				method: "get",
				url: "https://kanji-vercel-backend.vercel.app/kanjis",
			});
			console.log(result);
			setStates((prev) => ({ ...prev, data: result.data.data }));
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const generateRandomWord = () => {
		setStates((prev) => ({
			...prev,
			showAns: false,
			currentWord: Math.floor(Math.random() * states.data.length),
		}));
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<StatesContext.Provider value={{ states, setStates }}>
			<div className={Styles.App}>
				{loading ? (
					<h1>Loading</h1>
				) : (
					<>
						<h1>JLPT-Kanjis</h1>
						{states.showAns ? <Answer /> : <Kanji />}
						<Button onClick={generateRandomWord}>Next</Button>
					</>
				)}
			</div>
		</StatesContext.Provider>
	);
}

export default App;
export { StatesContext };
