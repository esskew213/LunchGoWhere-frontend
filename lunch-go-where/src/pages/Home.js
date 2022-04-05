import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import AutocompleteLocation from '../components/AutocompleteLocation';
import Slider from '../components/Slider';
const Home = () => {
	return (
		<React.Fragment>
			<ResponsiveAppBar />
			<Typography variant="h4">SEARCH</Typography>
			<Box>
				<form>
					<AutocompleteLocation />
					<Slider label={'Price Range'} step={5} defaultValue={5} min={0} max={20} />
					<Slider label={'Wait Time'} step={5} defaultValue={5} min={0} max={30} />
					<Button color="secondary" type="submit" variant="contained">
						SEARCH
					</Button>
				</form>
			</Box>
		</React.Fragment>
	);
};

export default Home;
