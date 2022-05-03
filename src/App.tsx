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
	const [loading, setLoading] = useState<boolean>(false);
	const [level, setLevel] = useState<number>(5);
	const [wordSeq, setWordSeq] = useState<number[]>([0]);
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

	const getData = async () => {
		setLoading(true);
		try {
			const result = await axios({
				method: "get",
				url: `${process.env.REACT_APP_BACKEND_URL}/kanjis?level=${level}`,
			});
			setStates((prev) => ({ ...prev, data: result.data.data }));
			console.log(`${process.env.REACT_APP_BACKEND_URL}/kanjis?level=${level}`);
			
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const getNextWord = () => {
		setStates((prev) => ({
			...prev,
			showAns: false,
			wordIndexShifter: states.wordIndexShifter - 1,
			currentWord: states.currentWord + 1,
		}));
	};

	const getPreviousWord = () => {
		if (states.currentWord !== 0) {
			setStates((prev) => ({
				...prev,
				showAns: false,
				wordIndexShifter: states.wordIndexShifter + 1,
				currentWord: states.currentWord - 1,
			}));
		}
	};

	useEffect(() => {
		getData();
	}, [level]);

	useEffect(() => {
		document.querySelector<HTMLElement>(".app")?.click();
	}, []);

	return (
		<Routes>
			<Route
				path="/kanji_frontend_ts"
				element={
					<StatesContext.Provider value={{ states, setStates }}>
						<div
							className={`${Styles.App} app`}
							onKeyDown={(e) => {
								if (e.key === "ArrowLeft") {
									getPreviousWord();
								} else if (e.key === "ArrowRight") {
									getNextWord();
								} else if (e.key === "Enter") {
									setStates((prev) => ({ ...prev, showAns: !states.showAns }));
								}
							}}
							tabIndex={0}
						>
							{loading ? (
								<h1>Loading</h1>
							) : (
								<>
									<h1>JLPT-Kanjis</h1>
									<div className={Styles.auth_btns}>
										<NavLink to="/kanji_frontend_ts/login"><Button className={Styles.login_btn}>Login</Button></NavLink>
										<NavLink to="/kanji_frontend_ts/signup"><Button>SignUp</Button></NavLink>
									</div>
									<Stack direction={"row"} spacing={1}>
										<label htmlFor="level">JLPT Level:</label>
										<select
											name="level"
											id=""
											value={level}
											onChange={(e) => {
												setLevel(Number(e.target.value));
											}}
										>
											<option value="5">5</option>
											<option value="4">4</option>
											<option value="3">3</option>
											<option value="2">2</option>
											<option value="1">1</option>
										</select>
									</Stack>
									{states.data.length == 0 ? (
										<p style={{ textAlign: "center" }}>
											It seems we don't have any words added for N{level}{" "}
											level!😅
											<br />
											We're working on them!
										</p>
									) : (
										<>
											{states.showAns ? <Answer /> : <Kanji />}
											<div className={Styles.cmd_buttons}>
												<Button
													onClick={getPreviousWord}
													className={Styles.prev_btn}
												>
													Previous
												</Button>
												<Button onClick={getNextWord}>Next</Button>
											</div>
										</>
									)}
								</>
							)}
						</div>
					</StatesContext.Provider>
				}
			/>
			<Route path="/kanji_frontend_ts/login" element={<Login/>} />
			<Route path="/kanji_frontend_ts/signup" element={<Signup/>} />
		</Routes>
	);
}

export default App;
export { StatesContext };
