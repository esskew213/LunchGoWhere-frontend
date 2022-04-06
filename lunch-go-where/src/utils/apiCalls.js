import axios from 'axios';
const baseURL = 'http://localhost:5001';

const login = async (body) => {
	await axios.post(baseURL + '/login', body);
};

const postNewStall = async (body) => {
	await axios.post(baseURL + '/new', body);
};

const getRecommendedStalls = async () => {
	const response = await axios.get(baseURL + '/home');
	return response.data;
};
const apiCalls = { postNewStall, getRecommendedStalls, login };

export default apiCalls;
