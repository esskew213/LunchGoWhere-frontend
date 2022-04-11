import { Typography } from "@mui/material";
import React from "react";
import NewStallForm from "../components/NewStallForm";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

const NewStall = () => {
	return (
		<React.Fragment>
			<ResponsiveAppBar />
			<Typography variant="h2" gutterBottom>
				Add a stall
			</Typography>
			<div>
				<NewStallForm />
			</div>
		</React.Fragment>
	);
};

export default NewStall;
