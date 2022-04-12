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
    const [location, setLocation] = useState("");
    const [recStalls, setRecStalls] = useState([]);
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

    const handleLocationChange = (evt, value) => {
        setLocation(value);
    };
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
                    style={{
                        display: "flex",
                        maxWidth: "63%",
                        flexWrap: "wrap",
                    }}
                >
                    <AutocompleteLocation
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
                {recStalls
                    ? recStalls.map((stall, idKey) => {
                          console.log(stall.img.url);
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
