import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ sortedHawkers, handleFieldChange }) {
	return (
		<Autocomplete
			onChange={handleFieldChange}
			disablePortal
			options={sortedHawkers}
			sx={{ width: "100%", mr: "30px", mb: "20px" }}
			renderInput={(params) => <TextField {...params} label="Locations" variant="filled" required fullWidth />}
		/>
	);
}
