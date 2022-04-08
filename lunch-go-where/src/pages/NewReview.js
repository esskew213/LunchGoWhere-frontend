import React, { useEffect } from 'react';
import ReviewForm from '../components/ReviewForm';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import apis from '../utils/apiCalls';
import { useNavigate } from 'react-router-dom';
const NewReview = () => {
	const navigate = useNavigate();
	useEffect(() => {
		apis.checkAuthUser().catch((err) => navigate('/'));
	}, []);
	return (
		<React.Fragment>
			<ResponsiveAppBar />
			<ReviewForm />
		</React.Fragment>
	);
};

export default NewReview;
