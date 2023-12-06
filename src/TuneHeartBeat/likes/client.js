// Import necessary dependencies
import axios from "axios";

const API_BASE = "http://localhost:4000/api";

const USERS_API = `${API_BASE}/users`;
const LIKES_API = `${API_BASE}/likes`;
const SONGLIKES_API = `${API_BASE}/songlikes`;
const POSTLIKES_API = `${API_BASE}/postLikes`;
const COMMENTLIKES_API = `${API_BASE}/commentLikes`; // Add the new constant for comment likes

export const findAllLikes = async () => {};

export const createUserLikesAlbum = async (userId, albumId) => {
  const response = await axios.post(`${USERS_API}/${userId}/likes/${albumId}`);
  return response.data;
};

export const deleteUserLikesAlbum = async (userId, albumId) => {};

export const findUsersThatLikeAlbum = async (albumId) => {
  const response = await axios.get(`${LIKES_API}/${albumId}/users`);
  return response.data;
};

export const createUserLikesSong = async (userId, songId) => {
  try {
    const response = await axios.post(`${USERS_API}/${userId}/songlikes/${songId}`);
    return response.data;
  } catch (error) {
    console.error("Error creating user likes song:", error);
    throw error;
  }
};

export const deleteUserLikesSong = async (userId, songId) => {};

export const findUsersThatLikeSong = async (songId) => {
  const response = await axios.get(`${SONGLIKES_API}/${songId}/users`);
  return response.data;
};

// New functions for post likes
export const findAllPostLikes = async () => {
  try {
    const response = await axios.get(`${POSTLIKES_API}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post likes:", error);
    throw error;
  }
};

export const createUserLikesPost = async (userId, postId) => {
  try {
    const response = await axios.post(`${USERS_API}/${userId}/postLikes/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error creating user likes post:", error);
    throw error;
  }
};

export const deleteUserLikesPost = async (userId, postId) => {
  try {
    const response = await axios.delete(`${USERS_API}/${userId}/postLikes/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user likes post:", error);
    throw error;
  }
};

export const findPostsThatUserLikes = async (userId) => {
  try {
    const response = await axios.get(`${USERS_API}/${userId}/postLikes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts that user likes:", error);
    throw error;
  }
};

export const findUsersThatLikePost = async (postId) => {
  try {
    const response = await axios.get(`${POSTLIKES_API}/${postId}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users that like post:", error);
    throw error;
  }
};

// New functions for comment likes
export const findAllCommentLikes = async () => {
  try {
    const response = await axios.get(`${COMMENTLIKES_API}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comment likes:", error);
    throw error;
  }
};

export const createUserLikescomment = async (userId, commentID) => {
  try {
    const response = await axios.post(`${USERS_API}/${userId}/commentLikes/${commentID}`);
    return response.data;
  } catch (error) {
    console.error("Error creating user likes comment:", error);
    throw error;
  }
};


export const deleteUserLikesComment = async (userId, commentID) => {
  try {
    const response = await axios.delete(`${USERS_API}/${userId}/commentLikes/${commentID}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user likes comment:", error);
    throw error;
  }
};

export const findCommentsThatUserLikes = async (userId) => {
  try {
    const response = await axios.get(`${USERS_API}/${userId}/commentLikes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments that user likes:", error);
    throw error;
  }
};

export const findUsersThatLikeComment = async (commentID) => {
  try {
    const response = await axios.get(`${COMMENTLIKES_API}/${commentID}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users that like comment:", error);
    throw error;
  }
};



