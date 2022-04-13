import React from "react";
import {
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Button,
	InputAdornment,
	Box,
	Divider,
	FormLabel,
	Modal,
	Card
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const IndividualCard = (props) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/result/${props.id}`);
	};

	return (
		<React.Fragment>
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: "30px",
					minHeight: "400px",
					minWidth: "300px",
					maxWidth: "400px",
					flexWrap: "wrap",
					m: "30px"
				}}
			>
				<img
					style={{ width: "300px", height: "250px", objectFit: "cover" }}
					src={props.img}
					alt={props.nameOfStall}
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						width: "100%"
					}}
				>
					<Typography variant="h6" sx={{ mt: "10px" }}>
						{props.nameOfStall}
					</Typography>
					<Typography sx={{ mt: "10px", fontStyle: "italic" }}>at {props.location}</Typography>
					<Typography sx={{ mt: "10px" }}>
						{props.cuisine} {props.cuisine === "Others" ? null : "food"}
					</Typography>
				</Box>
				<Button
					fullWidth
					onClick={handleClick}
					endIcon={<ArrowForwardIosIcon />}
					variant="contained"
					type="submit"
					sx={{ mt: "30px" }}
				>
					View Stall
				</Button>
			</Card>
		</React.Fragment>
	);
};

export default IndividualCard;
