import React from "react";
import {
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Button,
    InputAdornment,
    Box,
    Divider,
    FormLabel,
    Modal,
    Card,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const IndividualCard = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/result/${props.id}`);
    };

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "30px",
                    maxHeight: "380px",
                }}
            >
                <img
                    style={{ width: "300px", height: "250px" }}
                    src={props.img}
                    alt="Image of stall"
                />
                <Typography sx={{ mt: "10px" }}>
                    Stall name: {props.nameOfStall}
                </Typography>
                <Typography sx={{ mt: "10px" }}>
                    Cuisine: {props.cuisine}
                </Typography>
                <Typography sx={{ mt: "10px" }}>
                    Location: {props.location}
                </Typography>
                <Button
                    onClick={handleClick}
                    endIcon={<ArrowForwardIosIcon />}
                    variant="contained"
                    type="submit"
                    sx={{ width: "150px", mt: "30px" }}
                >
                    View Stall
                </Button>
            </Card>
        </>
    );
};

export default IndividualCard;
