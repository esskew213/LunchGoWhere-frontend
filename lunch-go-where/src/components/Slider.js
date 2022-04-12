import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

export default function PriceSlider({ label, step, handleChange, min, max }) {
	return (
		<Box sx={{ width: 300 }}>
			<Typography gutterBottom>{label}</Typography>
			<Slider
				aria-label="Price Range"
				valueLabelDisplay="auto"
				step={step}
				marks
				min={min}
				max={max}
				sx={{ maxWidth: "62%" }}
				onChange={handleChange}
			/>
		</Box>
	);
}
