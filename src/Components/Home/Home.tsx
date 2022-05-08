import React, { createContext, useContext, useEffect, useState } from "react";
import Styles from "../../App.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import Answer from "../AnswerComp/Answer";
import Kanji from "../KanjiComp/Kanji";
import { StatesContext } from "../../App";
import Cookies from "universal-cookie";
import axios from "axios";

function Home() {
	const cookies = new Cookies();
    const navigator = useNavigate();
	const [userAuth, setUserAuth] = useState<boolean>(false);
	const [level, setLevel] = useState<number>(5);
	const { states, setStates } = useContext(StatesContext);
	const [loading, setLoading] = useState<boolean>(false);

    //to authenticate the user using cookies
	const authenticate = async () => {
		try {
			const result = await axios({
				method: "get",
				url: `http://localhost:8000/auth`,
				withCredentials:true,
			});
			console.log(result);
			
			if (result.data.auth) {
				setUserAuth(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

    //to logout the user
    const logout = async ()=>{
        try {
            const result = await axios({
                method:"post",
                url:`${process.env.REACT_APP_BACKEND_URL}/logout`,
            });
            console.log(result);
            navigator("/kanji_frontend_ts/login")
        } catch (error) {
            console.log(error);
        };
    };

	const getNextWord = () => {
		setStates((prev: any) => ({
			...prev,
			showAns: false,
			wordIndexShifter: states.wordIndexShifter - 1,
			currentWord: states.currentWord + 1,
		}));
	};

	const getPreviousWord = () => {
		if (states.currentWord !== 0) {
			setStates((prev: any) => ({
				...prev,
				showAns: false,
				wordIndexShifter: states.wordIndexShifter + 1,
				currentWord: states.currentWord - 1,
			}));
		}
	};

    //to get the kanji data
	const getData = async () => {
		setLoading(true);
		try {
			const result = await axios({
				method: "get",
				url: `${process.env.REACT_APP_BACKEND_URL}/level=${level}`,
			});
			setStates((prev: any) => ({ ...prev, data: result.data }));
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};



	useEffect(() => {
		getData();
	}, [level]);

	useEffect(() => {
		// authenticate();
	}, []);

	return (
		<div
			className={`${Styles.App} app`}
			onKeyDown={(e) => {
				if (e.key === "ArrowLeft") {
					getPreviousWord();
				} else if (e.key === "ArrowRight") {
					getNextWord();
				} else if (e.key === "Enter") {
					setStates((prev: any) => ({ ...prev, showAns: !states.showAns }));
				}
			}}
			tabIndex={0}
		>
			{loading ? (
				<h1>Loading</h1>
			) : (
				<>
					<h1>JLPT-Kanjis</h1>
					{userAuth ? (
						<div className={Styles.auth_btns}>
							<NavLink to="/kanji_frontend_ts/">
								<Button className={Styles.login_btn}>Open Favs</Button>
							</NavLink>
							<Button onClick={logout}>Logout</Button>
						</div>
					) : (
						<div className={Styles.auth_btns}>
							<NavLink to="/kanji_frontend_ts/login">
								<Button className={Styles.login_btn}>Login</Button>
							</NavLink>
							<NavLink to="/kanji_frontend_ts/signup">
								<Button>SignUp</Button>
							</NavLink>
						</div>
					)}
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
					{states.data?.length == 0 ? (
						<p style={{ textAlign: "center" }}>
							It seems we don't have any words added for N{level} level!😅
							<br />
							We're working on them!
						</p>
					) : (
						<>
							{states.showAns ? <Answer /> : <Kanji />}
							<div className={Styles.cmd_buttons}>
								<Button onClick={getPreviousWord} className={Styles.prev_btn}>
									Previous
								</Button>
								<Button onClick={getNextWord}>Next</Button>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default Home;
