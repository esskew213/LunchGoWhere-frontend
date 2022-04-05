import React, { useState } from 'react';
import useSetInputState from '../hooks/useSetInputState';
import { FormControl, Box, TextField, Button, MenuItem, InputLabel, Select } from '@mui/material';
import AutocompleteLocation from './AutocompleteLocation';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import apis from '../utils/apiCalls';
const NewStallForm = () => {
	//// Using the useSetInputState custom hook
	const [ stallName, handleStallNameChange, resetStallName ] = useSetInputState('');
	const [ cuisine, handleCuisineChange, resetCuisine ] = useSetInputState('');
	//// Need to set a special handler for location to get value from autocomplete field
	const [ location, setLocation ] = useState('');
	const handleLocationChange = (evt, value) => {
		setLocation(value);
	};
	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log(stallName, location, cuisine);
		apis.postNewStall({ stallName, location, cuisine });
		resetStallName();
		resetCuisine();
		setLocation('');
	};
	return (
		<form onSubmit={handleSubmit}>
			<Box sx={{ px: '2vw' }}>
				<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
					<FormControl variant="standard" required sx={{ mr: '2vw' }}>
						<TextField
							variant="standard"
							size="small"
							label="Stall Name"
							type="text"
							value={stallName}
							onChange={handleStallNameChange}
							required
						/>
					</FormControl>
					<FormControl variant="standard" required sx={{ mr: '2vw' }}>
						<AutocompleteLocation handleFieldChange={handleLocationChange} />
					</FormControl>
					<FormControl variant="standard" required sx={{ minWidth: '120px' }}>
						<InputLabel id="cuisine">Cuisine</InputLabel>
						<Select
							labelId="cuisine"
							id="cuisine"
							label="Cuisine"
							value={cuisine}
							onChange={handleCuisineChange}
						>
							<MenuItem value={'Western'}>Western</MenuItem>
							<MenuItem value={'Chinese'}>Chinese</MenuItem>
							<MenuItem value={'Malay'}>Malay</MenuItem>
							<MenuItem value={'Korean'}>Korean</MenuItem>
							<MenuItem value={'Japanese'}>Japanese</MenuItem>
							<MenuItem value={'Indian'}>Indian</MenuItem>
							<MenuItem value={'Others'}>Others</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Button endIcon={<ArrowForwardIosIcon />} variant="contained" type="submit" sx={{ mt: '30px' }}>
					ADD NEW REVIEW
				</Button>
			</Box>
		</form>
	);
};

export default NewStallForm;
