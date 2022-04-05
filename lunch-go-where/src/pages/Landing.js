import React, { useState } from 'react';
import {
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Button,
	InputAdornment,
	Box,
	Divider,
	FormLabel
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

const Landing = () => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const handleUsernameChange = (evt) => {
		setUsername(evt.target.value);
	};
	const handlePasswordChange = (evt) => {
		setPassword(evt.target.value);
	};
	const handleSubmit = async (evt) => {
		evt.preventDefault();
	};
	return (
		<React.Fragment>
			<Box>
				<Typography variant="h2">Lunch go where?</Typography>
			</Box>
			<form action="/login" method="post">
				<Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '200px' }}>
					<FormControl variant="standard" required>
						<TextField
							variant="standard"
							size="small"
							label="Username"
							type="text"
							value={username}
							onChange={handleUsernameChange}
							required
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
						/>
					</FormControl>
					<Button
						endIcon={<ArrowForwardIosIcon />}
						variant="contained"
						type="submit"
						sx={{ width: '120px', mt: '30px' }}
					>
						LOGIN
					</Button>
				</Box>
			</form>
		</React.Fragment>
	);
};

export default Landing;
