import React, { useEffect, useState } from 'react';
import ReviewForm from '../components/ReviewForm';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import apis from '../utils/apiCalls';
import { useNavigate, useParams } from 'react-router-dom';
const Result = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stall, setStall] = useState({
        stallName: '',
        cuisine: '',
        location: '',
        submittedBy: '',
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
                navigate('/');
            });
        apis.getOneStall(id)
            .then((res) => {
                console.log(res);
                if (res.data) {
                    setErrMessage(null);
                    setStall(res.data);
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setErrMessage('Stall not found. Please try again');
                }
            });
    }, [reviewSubmitted]);
    return (
        <React.Fragment>
            <ResponsiveAppBar />
            {errMessage ? (
                <Typography>{errMessage}</Typography>
            ) : (
                <React.Fragment>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            p: '2rem',
                        }}
                    >
                        <Typography variant='h4' gutterBottom>
                            {stall.stallName}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '20vw',
                                    minWidth: '250px',
                                    maxWidth: '400px',
                                    borderRadius: '20px',
                                }}
                            >
                                <img
                                    src='https://www.visitsingapore.com/content/dam/desktop/global/tourism-editorials/stb/sniffing-out-local-food/2018/signpost-940x940.jpg'
                                    alt={stall.stallName}
                                    style={{
                                        width: '100%',
                                        borderRadius: '2vw',
                                    }}
                                />
                            </Box>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <LocationOnIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${stall.location.centerName}`}
                                        secondary='location'
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <RestaurantIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={stall.cuisine}
                                        secondary='cuisine'
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <PaidIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`$${stall.calcPrice}`}
                                        secondary='average wait time'
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <AccessTimeIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${stall.calcWait} min`}
                                        secondary='average wait time'
                                    />
                                </ListItem>
                            </List>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <FavoriteIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${stall.calcWouldEat}%`}
                                        secondary='would eat again'
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${stall.calcWouldQueue}%`}
                                        secondary='would queue again'
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <em>
                                                `Based on {stall.numReviews}{' '}
                                                review
                                                {stall.numReviews === 1
                                                    ? null
                                                    : 's'}
                                                `
                                            </em>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                    <ReviewForm
                        stallID={id}
                        setReviewSubmitted={setReviewSubmitted}
                        reviewSubmitted={reviewSubmitted}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default Result;
