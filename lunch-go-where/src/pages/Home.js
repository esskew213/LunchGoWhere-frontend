import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import AutocompleteLocation from "../components/AutocompleteLocation";
import Slider from "../components/Slider";
import apis from "../utils/apiCalls";
import IndividualCard from "../components/IndividualCard";

const Home = () => {
	const [ location, setLocation ] = useState("");
	const [ recStalls, setRecStalls ] = useState([]);
	const [ coords, setCoords ] = useState({ x: null, y: null });
	//**************************//
	//SECTION FOR GEOLOCATION
	//**************************//
	const [ status, setStatus ] = useState(null);
	const getLocation = async () => {
		if (!navigator.geolocation) {
			setStatus("Geolocation is not supported by your browser");
		} else {
			setStatus("Locating...");
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setStatus(null);
					const coords = { x: position.coords.latitude, y: position.coords.longitude };
					setCoords(coords);
				},
				() => {
					setStatus("Unable to retrieve your location");
				}
			);
		}
	};

	useEffect(() => {
		getLocation();
	}, []);

	useEffect(
		() => {
			const getNearestStalls = async () => {
				if (coords.x && coords.y) {
					console.log(coords);
					const response = await apis.getNearestStalls(coords);
				}
			};
			getNearestStalls();
		},
		[ coords ]
	);
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
					<Slider label={"Price Range"} step={5} defaultValue={5} min={0} max={20} />
					<Slider label={"Wait Time"} step={5} defaultValue={5} min={0} max={30} />
					<Button color="secondary" type="submit" variant="contained">
						SEARCH
					</Button>
				</form>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
				{recStalls ? (
					recStalls.map((stall) => {
						console.log(stall.stallName);
						return (
							<React.Fragment>
								<IndividualCard
									// img={stall.img}
									id={stall._id}
									nameOfStall={stall.stallName}
									cuisine={stall.cuisine}
									location={stall.location}
								/>
								{/* <Typography>Submitted by: {stall.author.name}</Typography> */}
							</React.Fragment>
						);
					})
				) : null}
			</Box>
		</React.Fragment>
	);
};

export default Home;
