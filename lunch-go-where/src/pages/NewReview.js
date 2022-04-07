import React, { useEffect } from 'react';
import ReviewForm from '../components/ReviewForm';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import apis from '../utils/apiCalls';
import { Navigate, useNavigate } from 'react-router-dom';
const NewReview = () => {
	const navigate = useNavigate();
	useEffect(() => {
		apis.getUser();
	}, []);
	return (
		<React.Fragment>
			<ResponsiveAppBar />
			<ReviewForm />
		</React.Fragment>
	);
};

export default NewReview;
