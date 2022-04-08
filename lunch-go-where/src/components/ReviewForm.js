import React from 'react';
import useSetInputState from '../hooks/useSetInputState';
import { TextField, FormControl, Button, Box, Checkbox, FormControlLabel } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import apis from '../utils/apiCalls';
const ReviewForm = ({ stallID }) => {
	const [ price, handlePriceChange, resetPrice ] = useSetInputState(0);
	const [ waitTime, handleWaitTimeChange, resetWaitTime ] = useSetInputState(5);
	const [ wouldEatAgain, handleWouldEatChange, resetWouldEat ] = useSetInputState(false);
	const [ wouldQueueAgain, handleWouldQueueChange, resetWouldQueue ] = useSetInputState(false);
	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log(price, waitTime, wouldEatAgain, wouldQueueAgain, stallID);
		apis.postNewReview({ price, waitTime, wouldEatAgain, wouldQueueAgain, stallID });
	};
	return (
		<form onSubmit={handleSubmit}>
			<Box sx={{ px: '2vw' }}>
				<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
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
					<FormControl>
						<FormControlLabel
							value="start"
							control={
								<Checkbox
									icon={<FastfoodOutlinedIcon />}
									checkedIcon={<FastfoodIcon />}
									value={true}
									onChange={handleWouldEatChange}
								/>
							}
							label="Would eat again"
							labelPlacement="start"
						/>
					</FormControl>
					<FormControl>
						<FormControlLabel
							value="start"
							control={
								<Checkbox
									icon={<FavoriteBorder />}
									checkedIcon={<Favorite />}
									value={true}
									onChange={handleWouldQueueChange}
								/>
							}
							label="Would queue again"
							labelPlacement="start"
						/>
					</FormControl>
				</Box>
				<Button endIcon={<ArrowForwardIosIcon />} variant="contained" type="submit" sx={{ mt: '30px' }}>
					ADD NEW REVIEW
				</Button>
			</Box>
		</form>
	);
};

export default ReviewForm;
