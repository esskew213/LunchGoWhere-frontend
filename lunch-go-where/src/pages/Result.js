import React, { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";
import apis from "../utils/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
const Result = () => {
<<<<<<< HEAD
    const { id } = useParams();
    const navigate = useNavigate();
    const [stall, setStall] = useState({
        stallName: "",
        cuisine: "",
        location: { centerName: "" },
        img: { url: "" },
        submittedBy: "",
        calcPrice: "",
        calcWait: "",
        calcWouldEat: "",
        calcWouldQueue: "",
    });
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    useEffect(() => {
        setReviewSubmitted(false);
        apis.checkAuthUser()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
                navigate("/");
            });
        apis.getOneStall(id)
            .then((res) => {
                console.log(res);
                if (res.data.stall) {
                    setErrMessage(null);
                    setStall(res.data.stall);
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setErrMessage("Stall not found. Please try again");
                }
            });
    }, [reviewSubmitted]);
    return (
        <React.Fragment>
            <ResponsiveAppBar />
            {errMessage ? (
                <Typography sx={{ textAlign: "center" }}>
                    {errMessage}
                </Typography>
            ) : (
                <React.Fragment>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            px: "2vw",
                            py: "5vh",
                            width: "100vw",
                            boxSizing: "border-box",
                        }}
                    >
                        <Typography
                            sx={{ color: "primary.dark" }}
                            variant="h3"
                            gutterBottom
                        >
                            {stall.stallName}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    flexWrap: "wrap",
                                    mr: "50px",
                                    // width: '60vw'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "20vw",
                                        minWidth: "300px",
                                        mr: "50px",
                                        maxWidth: "500px",
                                    }}
                                >
                                    <img
                                        src={stall.img.url}
                                        alt={stall.stallName}
                                        style={{
                                            width: "100%",
                                            borderRadius: "2vw",
                                        }}
                                    />
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemIcon>
                                                <LocationOnIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                sx={{ fontStyle: "italic" }}
                                                primary={`${stall.location.centerName}`}
                                            />
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemIcon>
                                                <RestaurantIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                sx={{ fontStyle: "italic" }}
                                                primary={`${stall.cuisine} food`}
                                            />
                                        </ListItem>
                                    </List>
                                </Box>
                                {stall.numReviews ? (
                                    <Box>
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemIcon>
                                                    <PaidIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`~$${stall.calcPrice}`}
                                                    secondary="average price"
                                                />
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemIcon>
                                                    <AccessTimeIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`~${stall.calcWait} min`}
                                                    secondary="average wait time"
                                                />
                                            </ListItem>
=======
	const { id } = useParams();
	const navigate = useNavigate();
	const [ stall, setStall ] = useState({
		stallName: "",
		cuisine: "",
		location: { centerName: "" },
		img: { url: "" },
		submittedBy: "",
		calcPrice: "",
		calcWait: "",
		calcWouldEat: "",
		calcWouldQueue: "",
		author: ""
	});
	const [ reviewSubmitted, setReviewSubmitted ] = useState(false);
	const [ errMessage, setErrMessage ] = useState(null);
	useEffect(
		() => {
			setReviewSubmitted(false);
			apis
				.checkAuthUser()
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err.response);
					navigate("/");
				});
			apis
				.getOneStall(id)
				.then((res) => {
					console.log(res);
					if (res.data.stall) {
						setErrMessage(null);
						setStall(res.data.stall);
					}
				})
				.catch((err) => {
					if (err.response.status === 404) {
						setErrMessage("Stall not found. Please try again");
					}
				});
		},
		[ reviewSubmitted ]
	);
	return (
		<React.Fragment>
			<ResponsiveAppBar />
			{errMessage ? (
				<Typography sx={{ textAlign: "center" }}>{errMessage}</Typography>
			) : (
				<React.Fragment>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							justifyContent: "flex-start",
							px: "2vw",
							py: "5vh",
							width: "100vw",
							boxSizing: "border-box"
						}}
					>
						<Typography sx={{ color: "primary.dark" }} variant="h3" gutterBottom>
							{stall.stallName}
						</Typography>

						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								width: "100%",
								alignItems: "flex-start",
								flexWrap: "wrap"
							}}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									alignItems: "flex-start",
									flexWrap: "wrap",
									mr: "50px"
									// width: '60vw'
								}}
							>
								<Box
									sx={{
										width: "20vw",
										minWidth: "300px",
										mr: "30px",
										maxWidth: "500px"
									}}
								>
									<img
										src={stall.img.url}
										alt={stall.stallName}
										style={{ width: "100%", borderRadius: "2vw" }}
									/>
									<List>
										<ListItem disablePadding>
											<ListItemIcon>
												<LocationOnIcon />
											</ListItemIcon>
											<ListItemText
												sx={{ fontStyle: "italic" }}
												primary={`${stall.location.centerName}`}
											/>
										</ListItem>
										<ListItem disablePadding>
											<ListItemIcon>
												<RestaurantIcon />
											</ListItemIcon>
											<ListItemText
												sx={{ fontStyle: "italic" }}
												primary={`${stall.cuisine} food`}
											/>
										</ListItem>
										<ListItem disablePadding>
											<ListItemIcon>
												<PersonIcon />
											</ListItemIcon>
											<ListItemText
												sx={{ fontStyle: "italic" }}
												primary={`Contributed by ${stall.author.username}`}
											/>
										</ListItem>
									</List>
								</Box>
								{stall.numReviews ? (
									<Box>
										<List>
											<ListItem disablePadding>
												<ListItemIcon>
													<PaidIcon />
												</ListItemIcon>
												<ListItemText
													primary={`~$${stall.calcPrice}`}
													secondary="average wait time"
												/>
											</ListItem>
											<ListItem disablePadding>
												<ListItemIcon>
													<AccessTimeIcon />
												</ListItemIcon>
												<ListItemText
													primary={`~${stall.calcWait} min`}
													secondary="average wait time"
												/>
											</ListItem>
>>>>>>> master

                                            <ListItem disablePadding>
                                                <ListItemIcon>
                                                    <FavoriteIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`${stall.calcWouldEat}%`}
                                                    secondary="would eat again"
                                                />
                                            </ListItem>

                                            <ListItem disablePadding>
                                                <ListItemIcon>
                                                    <PeopleIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`${stall.calcWouldQueue}%`}
                                                    secondary="would queue again"
                                                />
                                            </ListItem>

                                            <ListItem disableGutters>
                                                <ListItemText
                                                    sx={{
                                                        fontWeight: "light",
                                                        fontSize: 16,
                                                    }}
                                                    primary={`Based on ${
                                                        stall.numReviews
                                                    } review${
                                                        stall.numReviews === 1
                                                            ? ""
                                                            : "s"
                                                    }`}
                                                />
                                            </ListItem>
                                        </List>
                                    </Box>
                                ) : (
                                    <Typography>
                                        No reviews yet. Add a review!
                                    </Typography>
                                )}
                            </Box>

                            <ReviewForm
                                stallID={id}
                                setReviewSubmitted={setReviewSubmitted}
                                reviewSubmitted={reviewSubmitted}
                            />
                        </Box>
                    </Box>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default Result;
