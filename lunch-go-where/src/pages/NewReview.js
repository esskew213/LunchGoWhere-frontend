import React from 'react';
import ReviewForm from '../components/ReviewForm';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
const NewReview = () => {
	return (
		<React.Fragment>
			<ResponsiveAppBar />
			<ReviewForm />
		</React.Fragment>
	);
};

export default NewReview;
