import axios from "axios";

const BASE_URL = "http://localhost:4000/api"; 
const COMMENTS_URL = `${BASE_URL}/comments`;


export const deleteComment = async (commentId) => {
    const response = await axios.delete(`${COMMENTS_URL}/${commentId}`);
    return response.data;
  };
  
  export const createComment = async (postId, comment) => {
    const response = await axios.post(`${BASE_URL}/posts/${postId}/comments`, comment);
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