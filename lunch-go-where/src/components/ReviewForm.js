import React, { useEffect, useState } from 'react';
import useSetInputState from '../hooks/useSetInputState';
import { Typography, TextField, FormControl, Button, Box, FormControlLabel, FormGroup, Switch } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import apis from '../utils/apiCalls';

const ReviewForm = ({ stallID, setReviewSubmitted, reviewSubmitted }) => {
	const [ hasReviewedBefore, setHasReviewedBefore ] = useState(false);
	const [ price, setPrice, handlePriceChange, resetPrice ] = useSetInputState(0);
	const [ waitTime, setWaitTime, handleWaitTimeChange, resetWaitTime ] = useSetInputState(5);
	const [ wouldEatAgain, setWouldEat ] = useSetInputState(false);
	const [ wouldQueueAgain, setWouldQueue ] = useSetInputState(false);
	const handleWouldEatChange = (evt) => {
		setWouldEat((prevState) => !prevState);
	};
	const handleWouldQueueChange = (evt) => {
		setWouldQueue((prevState) => !prevState);
	};
	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log(price, waitTime, wouldEatAgain, wouldQueueAgain, stallID);
		if (hasReviewedBefore) {
			apis.updateReview({ price, waitTime, wouldEatAgain, wouldQueueAgain, stallID });
		} else {
			apis.postNewReview({ price, waitTime, wouldEatAgain, wouldQueueAgain, stallID });
		}
		resetPrice();
		resetWaitTime();
		setWouldEat(false);
		setWouldQueue(false);
		setReviewSubmitted(true);
	};
	useEffect(
		() => {
			apis
				.getExistingReview(stallID)
				.then((res) => {
					console.log(res);
					if (res.data.review !== null) {
						console.log('Previous review detected.', res.data);
						const { price, waitTime, wouldEatAgain, wouldQueueAgain } = res.data.review;
						setPrice(price);
						setWaitTime(waitTime);
						setWouldEat(wouldEatAgain);
						setWouldQueue(wouldQueueAgain);
						setHasReviewedBefore(true);
					} else {
						console.log('No previous review detected.');
					}
				})
				.catch((err) => {
					console.log(err.response);
				});
		},
		[ reviewSubmitted ]
	);
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '20vw',
				minWidth: '300px',
				maxWidth: '400px',
				backgroundColor: 'secondary.light',
				borderRadius: '20px',
				p: '20px',
				boxSizing: 'border-box'
			}}
		>
			<Typography variant="h6">Your review</Typography>
			<form onSubmit={handleSubmit}>
				<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<FormControl margin="normal" variant="standard" required sx={{ mr: '2vw' }}>
						<TextField
							fullWidth
							variant="standard"
							size="small"
							label="Price"
							type="number"
							value={price}
							onChange={handlePriceChange}
							required
							helperText="How much did you spend?"
						/>
					</FormControl>
					<FormControl margin="normal" variant="standard" required sx={{ mr: '2vw' }}>
						<TextField
							fullWidth
							variant="standard"
							size="small"
							label="Wait Time"
							type="number"
							value={waitTime}
							onChange={handleWaitTimeChange}
							required
							helperText="How long did it take to get your food?"
						/>
					</FormControl>
					<FormGroup>
						<FormControlLabel
							sx={{ mt: '10px' }}
							control={<Switch checked={wouldEatAgain} onChange={handleWouldEatChange} />}
							label="Would eat again"
						/>
						<FormControlLabel
							sx={{ mt: '10px' }}
							control={<Switch checked={wouldQueueAgain} onChange={handleWouldQueueChange} />}
							label="Would queue again"
						/>
					</FormGroup>
				</Box>
				<Button endIcon={<ArrowForwardIosIcon />} variant="contained" type="submit" sx={{ mt: '30px' }}>
					{hasReviewedBefore ? 'UPDATE REVIEW' : 'ADD REVIEW'}
				</Button>
			</form>
		</Box>
	);
};

export default ReviewForm;
