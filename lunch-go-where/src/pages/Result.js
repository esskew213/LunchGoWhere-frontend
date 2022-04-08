import React, { useEffect } from 'react';
import ReviewForm from '../components/ReviewForm';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import apis from '../utils/apiCalls';
import { useNavigate, useParams } from 'react-router-dom';
const Result = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		apis.checkAuthUser().then((res) => console.log(res)).catch((err) => {
			console.log(err.response);
			navigate('/');
		});
		apis.getOneStall(id).then((res) => console.log(res));
	}, []);
	return (
		<React.Fragment>
			<ResponsiveAppBar />
			<img />
			<ReviewForm />
		</React.Fragment>
	);
};

export default Result;
