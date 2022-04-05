import React from 'react';

const SignInForm = () => {
	return (
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
	);
};

export default SignInForm;
