import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSetInputState from "../hooks/useSetInputState";
import locations from "../hawkerCenters";
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
import { display } from "@mui/system";

const NewStallForm = () => {
    //// Using the useSetInputState custom hook
    const [stallName, setStallName, handleStallNameChange, resetStallName] =
        useSetInputState("");
    const [cuisine, setCuisine, handleCuisineChange, resetCuisine] =
        useSetInputState("");
    const [image, setImage] = useState("");

    //// Need to set a special handler for location to get value from autocomplete field
    const [location, setLocation] = useState("");
    const handleLocationChange = (evt, value) => {
        setLocation(value);
    };

    //**************************//
    //SECTION FOR GEOLOCATION
    //**************************//
    const [coords, setCoords] = useState({ x: null, y: null });
    const [status, setStatus] = useState(null);
    const [sortedHawkers, setSortedHawkers] = useState(locations);
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
                        y: position.coords.latitude,
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
        getLocation();
    }, []);

    useEffect(() => {
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
    }, [coords]);

    let navigate = useNavigate();
    const handleImageChange = (evt) => {
        console.log(evt);
        if (evt.target.files.length === 1) {
            const img = {
                preview: URL.createObjectURL(evt.target.files[0]),
                data: evt.target.files[0],
            };
            setImage(img);
            console.log(img);
        } else {
            setImage({
                preview: "",
                data: "",
            });
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let formData = new FormData();
        formData.append("file", image.data);
        formData.append("stallName", stallName);
        formData.append("location", location);
        formData.append("cuisine", cuisine);
        console.log(stallName, location, cuisine, image.data);
        apis.postNewStall(formData)
            .then((res) => {
                resetStallName();
                resetCuisine();
                setLocation(0);
                navigate(`../result/${res.data.stallID}`);
            })
            .catch((err) => console.log(err));
    };
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        minWidth: "80vw",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <FormControl
                            variant="standard"
                            required
                            sx={{
                                mr: "2vw",
                                pt: "50px",
                                pb: "50px",
                                minWidth: "100%",
                            }}
                        >
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
                        <FormControl
                            variant="standard"
                            required
                            sx={{ mr: "2vw", minWidth: "100%" }}
                        >
                            <AutocompleteLocation
                                handleFieldChange={handleLocationChange}
                                sortedHawkers={sortedHawkers}
                            />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            required
                            sx={{ minWidth: "100%", pt: "20px" }}
                        >
                            <InputLabel id="cuisine" sx={{ pt: "20px" }}>
                                Cuisine
                            </InputLabel>
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
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: "30px",
                        }}
                    >
                        {image.preview && (
                            <img
                                src={image.preview}
                                alt="preview"
                                width="100%"
                                height="200"
                            />
                        )}
                        <FormControl
                            variant="standard"
                            required
                            sx={{ minWidth: "120px", mt: "30px" }}
                        >
                            <Input
                                id="stallImg"
                                type="file"
                                name="file"
                                onChange={handleImageChange}
                            />
                        </FormControl>
                        <Button
                            endIcon={<ArrowForwardIosIcon />}
                            variant="contained"
                            type="submit"
                            sx={{ mt: "40px", width: "300px" }}
                        >
                            ADD NEW REVIEW
                        </Button>
                    </Box>
                </Box>
            </form>
        </React.Fragment>
    );
};

export default NewStallForm;
