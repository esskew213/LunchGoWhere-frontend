import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ handleFieldChange }) {
	return (
		<Autocomplete
			onChange={handleFieldChange}
			disablePortal
			options={locations}
			sx={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Locations" />}
		/>
	);
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const locations = [
	'Amoy Street Food Centre',
	'Hong Lim Market & Food Centre',
	'Tanjong Pagar Plaza Market & Food Centre',
	'Maxwell Food Centre',
	"People's Park Food Centre"
];
