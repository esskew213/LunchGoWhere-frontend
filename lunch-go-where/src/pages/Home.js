import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import AutocompleteLocation from '../components/AutocompleteLocation';
import Slider from '../components/Slider';
import apis from '../utils/apiCalls';

const Home = () => {
	const [ location, setLocation ] = useState('');
	const [ recStalls, setRecStalls ] = useState([]);
	const handleLocationChange = (evt, value) => {
		setLocation(value);
	};
	useEffect(() => {
		apis
			.getRecommendedStalls()
			.then((data) => {
				setRecStalls(data);
				// console.log('RETURNING ', data);
			})
			.catch((err) => console.error(err));
	}, []);
	return (
		<React.Fragment>
			<ResponsiveAppBar />
			<Typography variant="h4">SEARCH</Typography>
			<Box>
				<form>
					<AutocompleteLocation handleFieldChange={handleLocationChange} />
					<Slider label={'Price Range'} step={5} defaultValue={5} min={0} max={20} />
					<Slider label={'Wait Time'} step={5} defaultValue={5} min={0} max={30} />
					<Button color="secondary" type="submit" variant="contained">
						SEARCH
					</Button>
				</form>
			</Box>
			<Box>
				{recStalls ? (
					recStalls.map((stall) => {
						return (
							<React.Fragment>
								<Typography>Stall name: {stall.stallName}</Typography>
								<Typography>Cuisine: {stall.cuisine}</Typography>
								<Typography>Location: {stall.location}</Typography>
								<Typography>Submitted by: {stall.author.name}</Typography>
							</React.Fragment>
						);
					})
				) : null}
			</Box>
		</React.Fragment>
	);
};

export default Home;
