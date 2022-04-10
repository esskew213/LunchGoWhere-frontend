import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSetInputState from '../hooks/useSetInputState';
import { FormControl, Box, TextField, Button, MenuItem, InputLabel, Select, Input } from '@mui/material';
import AutocompleteLocation from './AutocompleteLocation';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import apis from '../utils/apiCalls';

const NewStallForm = () => {
	//// Using the useSetInputState custom hook
	const [ stallName, handleStallNameChange, resetStallName ] = useSetInputState('');

	const [ cuisine, handleCuisineChange, resetCuisine ] = useSetInputState('');

	const [ image, setImage ] = useState('');

	//// Need to set a special handler for location to get value from autocomplete field
	const [ location, setLocation ] = useState('');
	const handleLocationChange = (evt, value) => {
		setLocation(value);
	};
	const [ lat, setLat ] = useState(null);
	const [ lng, setLng ] = useState(null);
	const [ status, setStatus ] = useState(null);

	const getLocation = () => {
		if (!navigator.geolocation) {
			setStatus('Geolocation is not supported by your browser');
		} else {
			setStatus('Locating...');
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setStatus(null);
					setLat(position.coords.latitude);
					setLng(position.coords.longitude);
				},
				() => {
					setStatus('Unable to retrieve your location');
				}
			);
		}
	};

	useEffect(() => {
		getLocation();
		console.log(lat, lng);
	}, []);

	let navigate = useNavigate();
	let path = '../review';

	const handleImageChange = (evt) => {
		const img = {
			preview: URL.createObjectURL(evt.target.files[0]),
			data: evt.target.files[0]
		};
		setImage(img);
		console.log(img);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		let formData = new FormData();
		formData.append('file', image.data);
		formData.append('stallName', stallName);
		formData.append('location', location);
		formData.append('cuisine', cuisine);
		console.log(stallName, location, cuisine, image.data);
		apis.postNewStall(formData);
		resetStallName();
		resetCuisine();
		setLocation(0);
		navigate(path);
	};

	return (
		<React.Fragment>
			{image.preview && <img src={image.preview} alt="preview" width="200" height="200" />}

			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<Box sx={{ px: '2vw' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
						<FormControl variant="standard" required sx={{ minWidth: '120px' }}>
							<Input id="stallImg" type="file" name="file" onChange={handleImageChange} />
						</FormControl>
					</Box>
					<Button endIcon={<ArrowForwardIosIcon />} variant="contained" type="submit" sx={{ mt: '30px' }}>
						ADD NEW REVIEW
					</Button>
				</Box>
			</form>
		</React.Fragment>
	);
};

export default NewStallForm;
