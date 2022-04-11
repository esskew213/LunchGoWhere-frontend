import axios from "axios";
const baseURL = "http://localhost:5001";

const login = async (body) => {
	const response = await axios.post(baseURL + "/login", body, {
		withCredentials: true
	});
	console.log(response);
};

const getExistingReview = async (id) => {
	const response = await axios.get(baseURL + "/review/" + id, { withCredentials: true });
	return response;
};

const postNewStall = async (body) => {
	const response = await axios.post(baseURL + "/new", body, {
		withCredentials: true
	});
	console.log("POSTED NEW STALL", response);
	return response;
};

const postNewReview = async (body) => {
	await axios.post(baseURL + "/review", body, { withCredentials: true });
};

const deleteReview = async (id) => {
	await axios.delete(baseURL + "/review/" + id, { withCredentials: true });
};

const updateReview = async (body) => {
	await axios.patch(baseURL + "/review", body, { withCredentials: true });
};

const getRecommendedStalls = async () => {
	const response = await axios.get(baseURL + "/home");
	return response.data;
};

const postSignUp = async (body) => {
	const response = await axios.post(baseURL + "/signup", body, {
		withCredentials: true
	});
	console.log("POSTED SIGNUP", response);
	return response.data;
};

const checkAuthUser = async () => {
	const response = await axios.get(baseURL, {
		withCredentials: true
	});
	return response;
};

const getOneStall = async (id) => {
	console.log(id);
	const response = await axios.get(baseURL + "/food/stall/" + id, { withCredentials: true });
	return response;
};
const apiCalls = {
	postNewStall,
	postNewReview,
	getRecommendedStalls,
	postSignUp,
	login,
	checkAuthUser,
	getOneStall,
	getExistingReview,
	updateReview,
	deleteReview
};

export default apiCalls;
