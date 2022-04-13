import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import AutocompleteLocation from "../components/AutocompleteLocation";
import Slider from "../components/Slider";
import apis from "../utils/apiCalls";
import IndividualCard from "../components/IndividualCard";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import PaidIcon from "@mui/icons-material/Paid";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import locations from "../hawkerCenters";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
	const [ sortedHawkers, setSortedHawkers ] = useState(locations);
	const [ location, setLocation ] = useState("");
	const [ priceRange, setPriceRange ] = useState(0);
	const [ waitTime, setWaitTime ] = useState(0);
	const [ triggeredAPI, setTriggeredAPI ] = useState(false);
	const [ currentStalls, setCurrentStalls ] = useState([]);
	const navigate = useNavigate();
	const handleLocationChange = (evt, value) => {
		// evt.preventDefault();
		// console.log(value);
		setLocation(value);
	};
	const handlePriceChange = (evt) => {
		// evt.preventDefault();
		console.log(evt.target.value);
		setPriceRange(parseInt(evt.target.value));
	};
	const handleTimeChange = (evt) => {
		// evt.preventDefault();
		console.log(evt.target.value);
		setWaitTime(parseInt(evt.target.value));
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		// setLocation(event);
		const response = await apis.findStalls({
			centerName: location,
			priceRange: priceRange,
			waitTime: waitTime
		});
		setTriggeredAPI(true);
		// console.log(value);
		// console.log(response);
		setCurrentStalls(response.data);
		// console.log(response.data);
		// setInputLocation(true);
	};

	//**************************//
	//SECTION FOR GEOLOCATION
	//**************************//
	const [ coords, setCoords ] = useState({ x: null, y: null });
	const [ status, setStatus ] = useState(null);
	const getLocation = async () => {
		if (!navigator.geolocation) {
			setStatus("Geolocation is not supported by your browser");
		} else {
			setStatus("Locating...");
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setStatus(null);
					const coords = {
						x: position.coords.longitude,
						y: position.coords.latitude
					};
					setCoords(coords);
				},
				() => {
					setStatus("Unable to retrieve your location");
				}
			);
		}
	};

	useEffect(() => {
		setSortedHawkers(locations);
		getLocation();
	}, []);

	useEffect(
		() => {
			const getNearestStalls = async () => {
				if (coords.x && coords.y) {
					console.log(coords);
					await apis
						.getNearestStalls(coords)
						.then((res) => {
							console.log(res.data.sortedHawkers);
							setSortedHawkers(res.data.sortedHawkers);
						})
						.catch((err) => console.log(err));
				}
			};
			getNearestStalls();
		},
		[ coords ]
	);
	useEffect(() => {
		// apis
		// 	.checkAuthUser()
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err.response);
		// 		navigate("/");
		// 	});
		apis
			.getRecommendedStalls()
			.then((res) => {
				setCurrentStalls(res.data.stalls);
				// console.log('RETURNING ', data);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<React.Fragment>
			<ResponsiveAppBar />

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					// border: "2px solid black",
					// borderColor: "secondary.main",
					boxShadow: "2px 2px 3px rgba(0,0,0, 0.1)",
					borderRadius: "20px",
					width: "63vw",
					mx: "auto",
					mt: "5vh",
					py: "3vh",
					px: "3vh",
					backgroundColor: "rgba(255, 202, 40, 0.8)"
				}}
			>
				<Typography variant="h4" gutterBottom sx={{ alignSelf: "flex-start" }}>
					Search for stalls near you
				</Typography>
				<form
					onSubmit={handleSubmit}
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						width: "100%",
						flexWrap: "wrap"
					}}
				>
					<AutocompleteLocation sortedHawkers={sortedHawkers} handleFieldChange={handleLocationChange} />

					<Stack
						spacing={1}
						direction="row"
						sx={{ minWidth: "200px", mb: "10px" }}
						justifyContent="flex-start"
						alignItems="center"
					>
						<PaidIcon sx={{ pt: "25px", mr: "10px" }} />
						<Slider
							label={"Price Range"}
							step={5}
							min={0}
							max={50}
							handleChange={handlePriceChange}
							value={priceRange}
						/>
					</Stack>
					<Stack spacing={1} direction="row" sx={{ minWidth: "200px", mb: "10px" }} alignItems="center">
						<AccessTimeFilledIcon sx={{ pt: "25px", mr: "10px" }} />
						<Slider
							label={"Wait Time"}
							step={5}
							min={0}
							max={50}
							handleChange={handleTimeChange}
							value={waitTime}
						/>
					</Stack>
					<Stack
						spacing={1}
						direction="row"
						justifyContent="flex-end"
						alignItems="center"
						sx={{ mt: "10px" }}
					>
						<Button
							color="secondary"
							type="submit"
							variant="contained"
							sx={{ height: "min-content", backgroundColor: "primary.main", color: "white" }}
							endIcon={<SearchIcon />}
						>
							SEARCH
						</Button>
					</Stack>
				</form>
			</Box>

			<Box
				sx={{
					mt: "5vh",
					width: "90vw",
					display: "flex",
					flexDirection: "column",
					// alignItems: "center"

					mx: "auto"
				}}
			>
				<Typography variant="h5" sx={{ ml: "3vw", color: "primary.dark", fontWeight: "600" }}>
					{triggeredAPI ? "Search results" : "Trending stalls"}
				</Typography>

				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-start",
						flexWrap: "wrap",
						mx: "auto"
					}}
				>
					{currentStalls.length > 0 ? (
						currentStalls.map((currentStalls, idKey) => {
							console.log(currentStalls.img.url);
							return (
								<React.Fragment key={idKey}>
									<IndividualCard
										img={currentStalls.img.url}
										id={currentStalls._id}
										nameOfStall={currentStalls.stallName}
										cuisine={currentStalls.cuisine}
										location={currentStalls.location.centerName}
									/>
									{/* <Typography>Submitted by: {stall.author.name}</Typography> */}
								</React.Fragment>
							);
						})
					) : (
						<Typography variant="h6">No stalls found. Try a different search!</Typography>
					)}
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default Home;
