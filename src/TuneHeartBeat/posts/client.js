import axios from "axios";

const BASE_URL = "http://localhost:4000/api"; 

// Adjust the POSTS_URL to match the server route
const POSTS_URL = `${BASE_URL}/posts`;

export const deletePost = async (postId) => {
  // Adjust the URL to match the server route
  const response = await axios.delete(`${POSTS_URL}/${postId}`);
  return response.data;
};

export const createPost = async (userId, post) => {
  // Adjust the URL to match the server route
  const response = await axios.post(`${BASE_URL}/users/${userId}/posts`, post);
  return response.data;
};

export const fetchPosts = async (userId) => {
  // Adjust the URL to match the server route
  const response = await axios.get(`${BASE_URL}/users/${userId}/posts`);
  return response.data;
};

export const updatePost = async (post) => {
  const response = await axios.put(`${POSTS_URL}/${post._id}`, post);
  return response.data;
};
export const fetchPostById = async (postId) => {
  const response = await axios.get(`${POSTS_URL}/${postId}`);
  return response.data;
};