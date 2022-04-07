import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSetInputState from "../hooks/useSetInputState";
import {
  FormControl,
  Box,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  Input,
} from "@mui/material";
import AutocompleteLocation from "./AutocompleteLocation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import apis from "../utils/apiCalls";
import axios from "axios";

const NewStallForm = () => {
  //// Using the useSetInputState custom hook
  const [stallName, handleStallNameChange, resetStallName] =
    useSetInputState("");

  const [cuisine, handleCuisineChange, resetCuisine] = useSetInputState("");

  const [image, handleImageChange] = useState("");

  //// Need to set a special handler for location to get value from autocomplete field
  const [location, setLocation] = useState("");
  const handleLocationChange = (evt, value) => {
    setLocation(value);
  };

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
    console.log(lat, lng);
  }, []);

  let navigate = useNavigate();
  let path = "../review";

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(stallName, location, cuisine);
    apis.postNewStall({ stallName, location, cuisine });
    resetStallName();
    resetCuisine();
    setLocation(0);
    navigate(path);
  };

  const uploadImage = (files) => {
    // console.log(files[0]);
    const formData = new FormData();
    formData.append("file", image[0]);
    console.log(image[0]);
    formData.append("upload_preset", "uznhfuoe");
    console.log(formData);

    axios
      .post("https://api.cloudinary.com/v1_1/dgalezcxh/upload", formData)
      .then((response) => console.log(response));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ px: "2vw" }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}
        >
          <FormControl variant="standard" required sx={{ mr: "2vw" }}>
            <TextField
              variant="standard"
              size="small"
              label="Stall Name"
              type="text"
              value={stallName}
              onChange={handleStallNameChange}
              required
            />
          </FormControl>
          <FormControl variant="standard" required sx={{ mr: "2vw" }}>
            <AutocompleteLocation handleFieldChange={handleLocationChange} />
          </FormControl>
          <FormControl variant="standard" required sx={{ minWidth: "120px" }}>
            <InputLabel id="cuisine">Cuisine</InputLabel>
            <Select
              labelId="cuisine"
              id="cuisine"
              label="Cuisine"
              value={cuisine}
              onChange={handleCuisineChange}
            >
              <MenuItem value={"Western"}>Western</MenuItem>
              <MenuItem value={"Chinese"}>Chinese</MenuItem>
              <MenuItem value={"Malay"}>Malay</MenuItem>
              <MenuItem value={"Korean"}>Korean</MenuItem>
              <MenuItem value={"Japanese"}>Japanese</MenuItem>
              <MenuItem value={"Indian"}>Indian</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
          {/* <button id="upload_widget" class="cloudinary-button">
            Upload files
          </button>

          <script
            src="https://upload-widget.cloudinary.com/global/all.js"
            type="text/javascript"
          ></script>

          <script
            src="https://upload-widget.cloudinary.com/global/all.js"
            type="text/javascript"
          ></script> */}
          <FormControl variant="standard" required sx={{ minWidth: "120px" }}>
            <Input
              id="stallImg"
              type="file"
              onChange={(event) => {
                handleImageChange(event.target.files);
              }}
            />
          </FormControl>
          {/* <Button
            variant="contained"
            type="submit"
            sx={{ mt: "30px" }}
            onClick={uploadImage}
          >
            Upload Stall Image
          </Button> */}
        </Box>
        <Button
          endIcon={<ArrowForwardIosIcon />}
          variant="contained"
          type="submit"
          sx={{ mt: "30px" }}
          onClick={uploadImage}
        >
          ADD NEW REVIEW
        </Button>
      </Box>
    </form>
  );
};

export default NewStallForm;
