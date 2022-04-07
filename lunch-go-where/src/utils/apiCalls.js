import axios from "axios";
const baseURL = "http://localhost:5001";

const postNewStall = async (body) => {
  await axios.post(baseURL + "/new", body);
};

const getRecommendedStalls = async () => {
  const response = await axios.get(baseURL + "/home");
  return response.data;
};

const postSignUp = async (body) => {
  await axios.post(baseURL + "/signup", body);
};
const apiCalls = { postNewStall, getRecommendedStalls, postSignUp };

export default apiCalls;
