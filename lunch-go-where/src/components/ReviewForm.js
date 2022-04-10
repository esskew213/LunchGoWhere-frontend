import React, { useEffect, useState } from 'react';
import useSetInputState from '../hooks/useSetInputState';
import { TextField, FormControl, Button, Box, Checkbox, FormControlLabel, FormGroup, Switch } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import apis from '../utils/apiCalls';
const ReviewForm = ({ stallID }) => {
	const [ hasReviewed, setHasReviewed ] = useState(false);
	const [ price, setPrice, handlePriceChange, resetPrice ] = useSetInputState(0);
	const [ waitTime, setWaitTime, handleWaitTimeChange, resetWaitTime ] = useSetInputState(5);
	const [ wouldEatAgain, setWouldEat ] = useSetInputState(false);
	const [ wouldQueueAgain, setWouldQueue ] = useSetInputState(false);
	const handleWouldEatChange = (evt) => {
		setWouldEat((prevState) => !prevState);
		console.log(wouldEatAgain);
	};
	const handleWouldQueueChange = (evt) => {
		setWouldQueue((prevState) => !prevState);
		console.log(wouldQueueAgain);
	};
	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log(price, waitTime, wouldEatAgain, wouldQueueAgain, stallID);
		apis.postNewReview({ price, waitTime, wouldEatAgain, wouldQueueAgain, stallID });
		resetPrice();
		resetWaitTime();
		setWouldEat(false);
		setWouldQueue(false);
	};
	useEffect(() => {
		apis
			.getExistingReview(stallID)
			.then((res) => {
				if (res.data.review !== null) {
					console.log('Previous review detected.', res.data);
					const { price, waitTime, wouldEatAgain, wouldQueueAgain } = res.data.review;
					setPrice(price);
					setWaitTime(waitTime);
					setWouldEat(wouldEatAgain);
					setWouldQueue(wouldQueueAgain);
					setHasReviewed(true);
				} else {
					console.log('No previous review detected.');
				}
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, []);
	return (
		<form onSubmit={handleSubmit}>
			<Box sx={{ px: '2vw', width: '20vw' }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
					<FormControl variant="standard" required sx={{ mr: '2vw' }}>
						<TextField
							variant="standard"
							size="small"
							label="Price"
							type="number"
							value={price}
							onChange={handlePriceChange}
							required
						/>
					</FormControl>
					<FormControl variant="standard" required sx={{ mr: '2vw' }}>
						<TextField
							variant="standard"
							size="small"
							label="Wait Time"
							type="number"
							value={waitTime}
							onChange={handleWaitTimeChange}
							required
						/>
					</FormControl>
					<FormGroup>
						<FormControlLabel
							control={<Switch checked={wouldEatAgain} onChange={handleWouldEatChange} />}
							label="Would eat again"
						/>
						<FormControlLabel
							control={<Switch checked={wouldQueueAgain} onChange={handleWouldQueueChange} />}
							label="Would queue again"
						/>
					</FormGroup>
				</Box>
				<Button endIcon={<ArrowForwardIosIcon />} variant="contained" type="submit" sx={{ mt: '30px' }}>
					ADD NEW REVIEW
				</Button>
			</Box>
		</form>
	);
};

export default ReviewForm;
