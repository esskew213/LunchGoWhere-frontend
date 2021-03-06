import React, { useState, useEffect } from "react";
import {
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Button,
	InputAdornment,
	Box,
	Divider,
	FormLabel,
	Modal
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import apis from "../utils/apiCalls";
import { useNavigate } from "react-router-dom";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	textAlign: "center"
};

const Landing = () => {
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ name, setName ] = useState("");
	const [ newUsername, setNewUsername ] = useState("");
	const [ newPassword, setNewPassword ] = useState("");
	const [ isValid, setIsValid ] = useState(false);
	const [ showErrorLabel, setShowErrorLabel ] = useState(false);
	const navigate = useNavigate();
	const [ open, setOpen ] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	useEffect(() => {
		apis
			.checkAuthUser()
			.then((res) => {
				if (res.status === 200) {
					navigate("/home");
				}
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, []);

	const handleUsernameChange = (evt) => {
		if (evt.target.value.length === 0) {
			setUsername(evt.target.value);
		} else if (evt.target.value.length > 0) {
			setUsername(evt.target.value.trim());
		}
	};
	const handlePasswordChange = (evt) => {
		if (evt.target.value.length === 0) {
			setPassword(evt.target.value);
		} else if (evt.target.value.length > 0) {
			setPassword(evt.target.value.trim());
		}
	};
	const handleNewNameChange = (evt) => {
		if (evt.target.value.length === 0) {
			setName(evt.target.value);
		} else if (evt.target.value.length > 0) {
			setName(evt.target.value.trim());
		}
	};
	const handleNewUsernameChange = (evt) => {
		if (evt.target.value.length === 0) {
			setNewUsername(evt.target.value);
		} else if (evt.target.value.length > 0) {
			setNewUsername(evt.target.value.trim());
		}
	};
	const handleNewPasswordChange = (evt) => {
		const testPassword = evt.target.value;
		const condition = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		const test = condition.test(testPassword);
		if (test) {
			setNewPassword(testPassword);
			setIsValid(true);
		} else {
			console.log("Password Fail");
		}
		setNewPassword(testPassword);
	};
	const handleSubmit = async (evt) => {
		evt.preventDefault();
		console.log("SUBMITTING", username, password);
		try {
			await apis.login({ username: username, password: password });
			setUsername("");
			setPassword("");
			navigate("/home");
		} catch (err) {
			console.log(err);
		}
	};

	const handleSignUpClick = async (evt) => {
		evt.preventDefault();
		if (isValid !== true) {
			console.log(showErrorLabel);
			setShowErrorLabel(true);
		} else {
			try {
				await apis.postSignUp({
					name: name,
					username: newUsername,
					password: newPassword
				});
				setName("");
				setNewUsername("");
				setNewPassword("");
				navigate("/home");
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
				width: "100vw",
				alignItems: "center"
			}}
		>
			<form
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					width: "30%",
					padding: "80px"
				}}
			>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<Typography variant="h2">Lunch go where?</Typography>
					<FormControl variant="standard" required>
						<TextField
							variant="standard"
							size="small"
							label="Username"
							type="text"
							value={username}
							onChange={handleUsernameChange}
							required
							sx={{ mt: "30px" }}
						/>
					</FormControl>
					<FormControl variant="standard" required>
						<TextField
							variant="standard"
							size="small"
							label="Password"
							type="password"
							value={password}
							onChange={handlePasswordChange}
							required
							sx={{ mt: "30px" }}
						/>
					</FormControl>
				</Box>
				<Button endIcon={<ArrowForwardIosIcon />} variant="contained" type="submit" sx={{ mt: "30px" }}>
					Let's Find Out!
				</Button>
				<Typography sx={{ mt: "30px" }}>
					Don't have an account?
					<Button onClick={handleOpen}>Sign up now</Button>
				</Typography>
			</form>
			<Box>
				<img
					style={{
						objectFit: "cover",
						height: "100vh",
						width: "100vw",
						maxHeight: "100%",
						maxWidth: "100%"
					}}
					src="https://www.foodnavigator-usa.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/publications/food-beverage-nutrition/foodnavigator-usa.com/article/2020/06/23/untapped-market-potential-found-in-big-gap-between-consumers-seeking-using-functional-foods/11514857-1-eng-GB/Untapped-market-potential-found-in-big-gap-between-consumers-seeking-using-functional-foods.jpg"
					alt="Landing page img"
				/>
			</Box>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<form onSubmit={handleSignUpClick}>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h4" component="h2">
							Sign Up
						</Typography>
						<FormControl variant="standard" required>
							<TextField
								id="standard-basic"
								label="Name"
								variant="standard"
								value={name}
								onChange={handleNewNameChange}
								required
							/>
						</FormControl>
						<br />
						<FormControl variant="standard" required>
							<TextField
								id="standard-basic"
								label="Username"
								type="text"
								variant="standard"
								value={newUsername}
								onChange={handleNewUsernameChange}
								required
							/>
						</FormControl>
						<br />
						<FormControl variant="standard" required>
							<TextField
								id="standard-basic"
								label="Password"
								type="password"
								variant="standard"
								value={newPassword}
								onChange={handleNewPasswordChange}
								required
							/>
						</FormControl>
						<br />
						{showErrorLabel ? (
							<label>
								Password is not valid. Please include a letter and a number within your password.
							</label>
						) : (
							""
						)}
						<br />
						<Button variant="contained" type="submit" sx={{ width: "120px", mt: "30px" }}>
							Register Me!
						</Button>
					</Box>
				</form>
			</Modal>
		</div>
	);
};

export default Landing;
