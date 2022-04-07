import axios from 'axios';
const baseURL = 'http://localhost:5001';

const login = async (body) => {
	const response = await axios.post(baseURL + '/login', body, { withCredentials: true });
	console.log(response);
};

const postNewStall = async (body) => {
	await axios.post(baseURL + '/new', body);
};

const getRecommendedStalls = async () => {
	const response = await axios.get(baseURL + '/home');
	return response.data;
};
const apiCalls = { postNewStall, getRecommendedStalls, login };

const getUser = async () => {
	try {
		const response = await axios.get(baseURL);
		console.log(response.status);
		return response;
	} catch (e) {
		console.log(e);
};
	}
const apiCalls = { postNewStall, getRecommendedStalls, login, getUser };
const postSignUp = async (body) => {
  const response = await axios.post(baseURL + "/signup", body);
  return response.data;
};
const apiCalls = { postNewStall, getRecommendedStalls, postSignUp, login };

=======
export default apiCalls;
