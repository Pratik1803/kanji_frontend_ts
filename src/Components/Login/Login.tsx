import { TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Styles from "../../App.module.scss";

function Login() {
	const [user, setUser] = useState({
		username: "",
		password: "",
	});

	const submit = async () => {
		try {
			const result = await axios({
				method:"post",
				url:`${process.env.REACT_APP_BACKEND_URL}/login`,
				data:user,
			});
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={Styles.App}>
			<h1>Login</h1>
			<Stack direction={"column"} spacing={2}>
				<TextField
					variant="outlined"
					size="small"
					type={"text"}
					name="username"
					label="Username"
					value={user.username}
					onChange={(e) => {
						setUser((prev) => ({ ...prev, username: e.target.value }));
					}}
				/>
				<TextField
					variant="outlined"
					size="small"
					type={"password"}
					name="password"
					label="Password"
					value={user.password}
					onChange={(e) => {
						setUser((prev) => ({ ...prev, password: e.target.value }));
					}}
				/>
				<div className={Styles.action_btn}>
					<Button onClick={submit}>Login</Button>
				</div>
				<p>
					Don't have an account?{" "}
					<strong>
						<NavLink to="/kanji_frontend_ts/signup">Sign Up</NavLink>
					</strong>
				</p>
			</Stack>
		</div>
	);
}

export default Login;
