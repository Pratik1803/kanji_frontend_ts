import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import Styles from "../../App.module.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Signup() {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const submit = async()=>{
		try {
			const result = await axios({
				method:"post",
				url:"http://localhost:8000/api/signup",
				data:user
			});
			console.log(result.data);
		} catch (error) {
			console.log(error);
		};
	};

	return (
		<div className={Styles.App}>
			<h1>Become a member!</h1>
			<Stack direction={"column"} spacing={2}>
				<TextField
					variant="outlined"
					size="small"
					type={"text"}
					name="username"
					label="Username"
					value={user.username}
					onChange={(e)=>{
						setUser((prev)=>({...prev, username:e.target.value}))
					}}
				/>
				<TextField
					variant="outlined"
					size="small"
					type={"email"}
					name="email"
					label="Email"
					value={user.email}
					onChange={(e)=>{
						setUser((prev)=>({...prev, email:e.target.value}))
					}}
				/>
				<TextField
					variant="outlined"
					size="small"
					type={"password"}
					name="password"
					label="Password"
					value={user.password}
					onChange={(e)=>{
						setUser((prev)=>({...prev, password:e.target.value}))
					}}
				/>
				{/* <TextField
					variant="outlined"
					size="small"
					type={"password"}
					name="password"
					label="Confirm Password"
				/> */}
				<div className={Styles.action_btn}>
					<Button onClick={submit}>Signup</Button>
				</div>
        <p>Already have an account? <strong><NavLink to="/kanji_frontend_ts/login">Login</NavLink></strong></p>
			</Stack>
		</div>
	);
}

export default Signup;
