import axios from "axios";

const BASE_URL = "http://localhost:4000/api"; 

const POSTS_URL = `${BASE_URL}/posts`;
const COMMENTS_URL = `${BASE_URL}/comments`;

export const deletePost = async (postId) => {
  const response = await axios.delete(`${POSTS_URL}/${postId}`);
  return response.data;
};

export const createPost = async (userId, post) => {
  const response = await axios.post(`${POSTS_URL}/${userId}`, post);
  return response.data;
};

export const fetchPosts = async (userId) => {
  const response = await axios.get(`${POSTS_URL}/${userId}`);
  return response.data;
};

export const updatePost = async (post) => {
  const response = await axios.put(`${POSTS_URL}/${post._id}`, post);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await axios.delete(`${COMMENTS_URL}/${commentId}`);
  return response.data;
};

export const createComment = async (postId, comment) => {
  const response = await axios.post(`${COMMENTS_URL}/${postId}`, comment);
  return response.data;
};

export const fetchComments = async (postId) => {
  const response = await axios.get(`${COMMENTS_URL}/${postId}`);
  return response.data;
};

export const updateComment = async (comment) => {
  const response = await axios.put(`${COMMENTS_URL}/${comment._id}`, comment);
  return response.data;
};
