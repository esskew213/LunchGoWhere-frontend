import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import AutocompleteLocation from "../components/AutocompleteLocation";
import Slider from "../components/Slider";
import apis from "../utils/apiCalls";
import IndividualCard from "../components/IndividualCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [location, setLocation] = useState("");
    const [recStalls, setRecStalls] = useState([]);
    const [priceRange, setPriceRange] = useState(5);
    const [waitTime, setWaitTime] = useState(5);
    const [triggeredAPI, setTriggeredAPI] = useState(false);
    const [currentStalls, setCurrentStalls] = useState([]);

    const handleLocationChange = (evt, value) => {
        // evt.preventDefault();
        // console.log(value);
        setLocation(value);
    };

    const handlePriceChange = (evt) => {
        // evt.preventDefault();
        // console.log(evt.target.value);
        setPriceRange(parseInt(evt.target.value));
    };

    const handleTimeChange = (evt) => {
        // evt.preventDefault();
        // console.log(value);
        setWaitTime(parseInt(evt.target.value));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // setLocation(event);
        const response = await apis.findStalls({
            centerName: location,
            priceRange: priceRange,
            waitTime: waitTime,
        });
        setTriggeredAPI(true);
        // console.log(value);
        // console.log(response);
        setCurrentStalls(response.data);
        // console.log(response.data);
        // setInputLocation(true);
    };

    const navigate = useNavigate();

    useEffect(() => {
        apis.checkAuthUser()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
                navigate("/");
            });
    }, []);

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
            <Typography sx={{ textAlign: "center" }} variant="h4">
                SEARCH
            </Typography>
            <Box>
                <form onSubmit={handleSubmit}>
                    <AutocompleteLocation
                        handleFieldChange={handleLocationChange}
                    />
                    <Slider
                        label={"Price Range"}
                        step={5}
                        defaultValue={5}
                        min={0}
                        max={20}
                        value={priceRange}
                        handleChange={handlePriceChange}
                    />
                    <Slider
                        label={"Wait Time"}
                        step={5}
                        defaultValue={5}
                        min={0}
                        max={30}
                        handleChange={handleTimeChange}
                        value={waitTime}
                    />
                    <Button color="secondary" type="submit" variant="contained">
                        SEARCH
                    </Button>
                </form>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                {triggeredAPI
                    ? currentStalls.map((currentStalls) => {
                          console.log(currentStalls.img.url);
                          return (
                              <React.Fragment>
                                  <IndividualCard
                                      img={currentStalls.img.url}
                                      id={currentStalls._id}
                                      nameOfStall={currentStalls.stallName}
                                      cuisine={currentStalls.cuisine}
                                      location={
                                          currentStalls.location.centerName
                                      }
                                  />
                                  {/* <Typography>Submitted by: {stall.author.name}</Typography> */}
                              </React.Fragment>
                          );
                      })
                    : recStalls
                    ? recStalls.map((stall, idKey) => {
                          // console.log(stall.stallName);
                          return (
                              <React.Fragment key={idKey}>
                                  <IndividualCard
                                      img={stall.img.url}
                                      id={stall._id}
                                      nameOfStall={stall.stallName}
                                      cuisine={stall.cuisine}
                                      location={stall.location.centerName}
                                  />
                                  {/* <Typography>Submitted by: {stall.author.name}</Typography> */}
                              </React.Fragment>
                          );
                      })
                    : null}
            </Box>
        </React.Fragment>
    );
};

export default Home;
