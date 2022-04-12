import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import NewStallForm from "../components/NewStallForm";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import apis from "../utils/apiCalls";
import { useNavigate } from "react-router-dom";

const NewStall = () => {
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
    return (
        <React.Fragment>
            <ResponsiveAppBar />
            <Typography
                sx={{ textAlign: "center", mt: "20px" }}
                variant="h2"
                gutterBottom
            >
                Add your go to lunch!
            </Typography>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "100vh",
                    width: "100vw",
                    justifyContent: "center",
                }}
            >
                <NewStallForm />
            </div>
        </React.Fragment>
    );
};

export default NewStall;
