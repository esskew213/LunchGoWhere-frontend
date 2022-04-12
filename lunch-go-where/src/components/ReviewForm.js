import React, { useEffect, useState } from "react";
import useSetInputState from "../hooks/useSetInputState";
import { Typography, TextField, FormControl, Button, Box, FormControlLabel, FormGroup, Switch } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import apis from "../utils/apiCalls";

const ReviewForm = ({ stallID, setReviewSubmitted, reviewSubmitted }) => {
	const [ hasReviewedBefore, setHasReviewedBefore ] = useState(false);
	const [ price, setPrice ] = useState(1);
	const [ waitTime, setWaitTime ] = useState(0);
	const [ wouldEatAgain, setWouldEat ] = useSetInputState(false);
	const [ wouldQueueAgain, setWouldQueue ] = useSetInputState(false);
	const [ priceError, setPriceError ] = useState(false);
	const [ waitTimeError, setWaitTimeError ] = useState(false);

	const regex = new RegExp("/^[1-9][0-9]*$/");
	const handlePriceChange = (evt) => {
		setPriceError(false);
		setPrice(evt.target.value);
	};
	const handleWaitTimeChange = (evt) => {
		setWaitTimeError(false);
		setWaitTime(evt.target.value);
	};
	const handleWouldEatChange = (evt) => {
		setWouldEat((prevState) => !prevState);
	};
	const handleWouldQueueChange = (evt) => {
		setWouldQueue((prevState) => !prevState);
	};
	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log(price, waitTime, wouldEatAgain, wouldQueueAgain, stallID);
		if (!regex.test(price) || !regex.test(waitTime)) {
			setPriceError(!regex.test(price));
			setWaitTimeError(!regex.test(waitTime));
		} else {
			if (hasReviewedBefore) {
				apis.updateReview({ price, waitTime, wouldEatAgain, wouldQueueAgain, stallID });
			} else {
				apis.postNewReview({ price, waitTime, wouldEatAgain, wouldQueueAgain, stallID });
			}
			setPrice(1);
			setWaitTime(0);
			setWouldEat(false);
			setWouldQueue(false);
			setReviewSubmitted(true);
		}
	};
	const handleDeleteClick = (evt) => {
		console.log("deleting");
		apis
			.deleteReview(stallID)
			.then((res) => {
				console.log(res);
				setReviewSubmitted(true);
			})
			.catch((err) => console.log(err));
	};
	useEffect(
		() => {
			apis
				.getExistingReview(stallID)
				.then((res) => {
					console.log(res);
					if (res.data.review !== null) {
						console.log("Previous review detected.", res.data);
						const { price, waitTime, wouldEatAgain, wouldQueueAgain } = res.data.review;
						setPrice(price);
						setWaitTime(waitTime);
						setWouldEat(wouldEatAgain);
						setWouldQueue(wouldQueueAgain);
						setHasReviewedBefore(true);
					} else {
						console.log("No previous review detected.");
						setPrice(0);
						setWaitTime(0);
						setWouldEat(false);
						setWouldQueue(false);
						setHasReviewedBefore(false);
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
				display: "flex",
				flexDirection: "column",

				width: "20vw",
				minWidth: "300px",
				maxWidth: "400px",
				backgroundColor: "secondary.light",
				borderRadius: "20px",
				py: "20px",
				boxSizing: "border-box"
			}}
		>
			<Box sx={{ mx: "auto" }}>
				<Typography variant="h6">Your review</Typography>
				<form onSubmit={handleSubmit}>
					<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
						<FormControl fullWidth margin="normal" variant="standard" required>
							<TextField
								error={priceError}
								fullWidth
								variant="standard"
								size="small"
								label="Price"
								type="number"
								inputProps={{ min: 1, inputMode: "numeric", pattern: "^[1-9][0-9]*$" }}
								value={price}
								onChange={handlePriceChange}
								required
								helperText={
									priceError ? "Please enter a valid number." : "Around how much did you spend?"
								}
							/>
						</FormControl>
						<FormControl fullWidth margin="normal" variant="standard" required sx={{ mr: "2vw" }}>
							<TextField
								error={waitTimeError}
								fullWidth
								variant="standard"
								size="small"
								label="Wait Time"
								type="number"
								inputProps={{ min: 0, inputMode: "numeric", pattern: "^[1-9][0-9]*$" }}
								value={waitTime}
								onChange={handleWaitTimeChange}
								required
								helperText={
									waitTimeError ? (
										"Please enter a valid number."
									) : (
										"How long did it take to get your food?"
									)
								}
							/>
						</FormControl>
						<FormGroup>
							<FormControlLabel
								sx={{ mt: "10px" }}
								control={<Switch checked={wouldEatAgain} onChange={handleWouldEatChange} />}
								label="Would eat again"
							/>
							<FormControlLabel
								control={<Switch checked={wouldQueueAgain} onChange={handleWouldQueueChange} />}
								label="Would queue again"
							/>
						</FormGroup>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%"
							}}
						>
							<Button
								endIcon={<ArrowForwardIosIcon />}
								variant="contained"
								type="submit"
								fullWidth
								sx={{ mt: "10px", width: "min-content", justifySelf: "flex-end" }}
							>
								{hasReviewedBefore ? "UPDATE" : "SUBMIT"}
							</Button>
							{hasReviewedBefore ? (
								<Button
									fullWidth
									endIcon={<DeleteOutlineIcon />}
									variant="outlined"
									onClick={handleDeleteClick}
									sx={{ mt: "10px", width: "min-content" }}
								>
									DELETE
								</Button>
							) : null}
						</Box>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default ReviewForm;
