import axios from 'axios';
const baseURL = 'http://localhost:5001';

const login = async (body) => {
	const response = await axios.post(baseURL + '/login', body, { withCredentials: true });
	console.log(response);
};

const postNewStall = async (body) => {
	await axios.post(baseURL + '/new', body, { withCredentials: true });
};

const postNewReview = async (body) => {
	await axios.post(baseURL + '/review', body, { withCredentials: true });
};

const getRecommendedStalls = async () => {
	const response = await axios.get(baseURL + '/home');
	return response.data;
};

const postSignUp = async (body) => {
	const response = await axios.post(baseURL + '/signup', body, { withCredentials: true });
	console.log('POSTED SIGNUP', response);
	return response.data;
};

const checkAuthUser = async () => {
	const response = await axios.get(baseURL, { withCredentials: true });
	return response;
};

const getOneStall = async (id) => {
	console.log(id);
	const response = await axios.get(baseURL + '/food/' + id, { withCredentials: true });
	return response;
};
const apiCalls = { postNewStall, postNewReview, getRecommendedStalls, postSignUp, login, checkAuthUser, getOneStall };

export default apiCalls;
