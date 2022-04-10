import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import AutocompleteLocation from "../components/AutocompleteLocation";
import Slider from "../components/Slider";
import apis from "../utils/apiCalls";
import IndividualCard from "../components/IndividualCard";

const Home = () => {
    const [location, setLocation] = useState("");
    const [recStalls, setRecStalls] = useState([]);
    const [currentStalls, setCurrentStalls] = useState("");
    const [inputLocation, setInputLocation] = useState(false);
    const handleLocationChange = async (evt, value) => {
        evt.preventDefault();
        // setLocation(value);
        const response = await apis.findStalls({ centerName: value });
        console.log(value);
        setCurrentStalls(response.data);
        console.log(response.data);
        setInputLocation(true);
    };
    // console.log(location);
    useEffect(() => {
        apis.getRecommendedStalls()
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
                    <AutocompleteLocation
                        handleFieldChange={handleLocationChange}
                    />
                    <Slider
                        label={"Price Range"}
                        step={5}
                        defaultValue={5}
                        min={0}
                        max={20}
                    />
                    <Slider
                        label={"Wait Time"}
                        step={5}
                        defaultValue={5}
                        min={0}
                        max={30}
                    />
                    <Button color="secondary" type="submit" variant="contained">
                        SEARCH
                    </Button>
                </form>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                {inputLocation ? (
                    currentStalls.map((currentStalls) => {
                        console.log(currentStalls.stallName);
                        return (
                            <React.Fragment>
                                <IndividualCard
                                    // img={stall.img}
                                    id={currentStalls._id}
                                    nameOfStall={currentStalls.stallName}
                                    cuisine={currentStalls.cuisine}
                                    location={currentStalls.location}
                                />
                                {/* <Typography>Submitted by: {stall.author.name}</Typography> */}
                            </React.Fragment>
                        );
                    })
                ) : (
                    <React.Fragment>
                        <IndividualCard
                            // img={stall.img}
                            id={recStalls._id}
                            nameOfStall={recStalls.stallName}
                            cuisine={recStalls.cuisine}
                            location={recStalls.location}
                        />
                        {/* <Typography>Submitted by: {stall.author.name}</Typography> */}
                    </React.Fragment>
                )}
            </Box>
        </React.Fragment>
    );
};

export default Home;
