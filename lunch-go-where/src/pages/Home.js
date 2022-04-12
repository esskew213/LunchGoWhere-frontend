import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import AutocompleteLocation from "../components/AutocompleteLocation";
import Slider from "../components/Slider";
import apis from "../utils/apiCalls";
import IndividualCard from "../components/IndividualCard";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import PaidIcon from "@mui/icons-material/Paid";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

const Home = () => {
    const [sortedHawkers, setSortedHawkers] = useState([]);
    const [location, setLocation] = useState("");
    const [recStalls, setRecStalls] = useState([]);
    const [priceRange, setPriceRange] = useState(5);
    const [waitTime, setWaitTime] = useState(5);
    const [triggeredAPI, setTriggeredAPI] = useState(false);
    const [currentStalls, setCurrentStalls] = useState([]);
    const navigate = useNavigate();
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

    //**************************//
    //SECTION FOR GEOLOCATION
    //**************************//
    const [coords, setCoords] = useState({ x: null, y: null });
    const [status, setStatus] = useState(null);
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
            <Typography sx={{ textAlign: "center", m: "30px" }} variant="h4">
                SEARCH
            </Typography>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        maxWidth: "63%",
                        flexWrap: "wrap",
                    }}
                >
                    <AutocompleteLocation
                        sortedHawkers={sortedHawkers}
                        handleFieldChange={handleLocationChange}
                    />
                    <Stack
                        spacing={1}
                        direction="row"
                        sx={{ mb: 1 }}
                        alignItems="center"
                    >
                        <PaidIcon sx={{ pt: "25px" }} />
                        <Slider
                            label={"Price Range"}
                            step={5}
                            defaultValue={5}
                            min={0}
                            max={20}
                            handleChange={handlePriceChange}
                            value={priceRange}
                        />
                    </Stack>
                    <Stack
                        spacing={1}
                        direction="row"
                        sx={{ mb: 1 }}
                        alignItems="center"
                    >
                        <AccessTimeFilledIcon sx={{ pt: "25px" }} />
                        <Slider
                            label={"Wait Time"}
                            step={5}
                            defaultValue={5}
                            min={0}
                            max={30}
                            handleChange={handleTimeChange}
                            value={waitTime}
                        />
                    </Stack>
                    <Button
                        color="secondary"
                        type="submit"
                        variant="contained"
                        sx={{ height: "50px", ml: "30px" }}
                    >
                        SEARCH
                    </Button>
                </form>
            </div>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                }}
            >
                {" "}
                {triggeredAPI
                    ? currentStalls.map((currentStalls, idKey) => {
                          console.log(currentStalls.img.url);
                          return (
                              <React.Fragment key={idKey}>
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
