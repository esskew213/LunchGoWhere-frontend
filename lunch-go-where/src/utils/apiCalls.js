import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const baseURL = 'http://localhost:5001';

const login = async (body) => {
	const response = await axios.post(baseURL + '/login', body, { withCredentials: true });
	console.log(response);
};

const postNewStall = async (body) => {
  await axios.post(baseURL + "/new", body);
};

const getRecommendedStalls = async () => {
  const response = await axios.get(baseURL + "/home");
  return response.data;
};

const postSignUp = async (body) => {
	const response = await axios.post(baseURL + '/signup', body);
	return response.data;
};

const checkAuthUser = async () => {
	await axios
		.get('http://localhost:5001', { withCredentials: true })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.log(err.response);
		});
};

const apiCalls = { postNewStall, getRecommendedStalls, postSignUp, login, checkAuthUser };

export default apiCalls;
