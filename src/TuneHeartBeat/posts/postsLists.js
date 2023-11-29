import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillCheckCircleFill, BsGripVertical } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlinePlus, AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  addPost,
  deletePost,
  updatePost,
  setPost,
  setPosts,
  addComment,
  deleteComment,
  updateComment,
  setComments,
} from "./yourPostsAndCommentsReducer"; // Import your actual reducer actions
import * as client from "./client";

function PostList() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState({ title: "", content: "" });
  const [comment, setComment] = useState({ text: "" });

  useEffect(() => {
    // Fetch posts and comments for the user
    // Use your actual API calls or Redux actions
    client.fetchPosts(userId).then((posts) => dispatch(setPosts(posts)));
    client.fetchComments(userId).then((comments) => dispatch(setComments(comments)));
  }, [userId, dispatch]);

  const handleAddPost = () => {
    // Use your actual API calls or Redux actions
    client.createPost(userId, post).then((newPost) => dispatch(addPost(newPost)));
  };

  const handleUpdatePost = () => {
    // Use your actual API calls or Redux actions
    client.updatePost(post).then((updatedPost) => dispatch(updatePost(updatedPost)));
  };

  const handleDeletePost = (postId) => {
    // Use your actual API calls or Redux actions
    client.deletePost(postId).then(() => dispatch(deletePost(postId)));
  };

  const handleAddComment = (postId) => {
    // Use your actual API calls or Redux actions
    client.createComment(postId, comment).then((newComment) => dispatch(addComment(newComment)));
  };

  const handleUpdateComment = (commentId) => {
    // Use your actual API calls or Redux actions
    client.updateComment(commentId, comment).then((updatedComment) =>
      dispatch(updateComment(updatedComment))
    );
  };

  const handleDeleteComment = (commentId) => {
    // Use your actual API calls or Redux actions
    client.deleteComment(commentId).then(() => dispatch(deleteComment(commentId)));
  };

  const posts = useSelector((state) => state.yourPostsAndCommentsReducer.posts);
  const comments = useSelector((state) => state.yourPostsAndCommentsReducer.comments);

  return (
    <div className="list-container">
      {/* Add post input form */}
      <div className="form-group">
        <input
          value={post.title}
          className="form-control"
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />

        <textarea
          value={post.content}
          className="form-control"
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />

        <br />
        <button className="btn btn-success" onClick={handleAddPost}>
          Add Post
        </button>
        <button className="btn btn-primary" onClick={handleUpdatePost}>
          Update Post
        </button>
        <br />
        <br />
      </div>

      {/* Display posts and comments */}
      {posts.map((post, index) => (
        <div key={index}>
          <div className="list-header" style={{ marginBottom: "50px", height: "70px" }}>
            <BsGripVertical style={{ fontSize: "18px" }} />
            <b>{post.title}</b>
            <HiOutlineDotsVertical
              className="float-end"
              style={{ marginLeft: "10px", color: "gray" }}
            />
            <AiOutlinePlus
              className="float-end"
              style={{ marginLeft: "10px", color: "gray" }}
            />
            <BsFillCheckCircleFill
              className="float-end"
              style={{ marginLeft: "10px", color: "green" }}
            />
          </div>
          <ul className="list-group" style={{ marginBottom: "10px" }}>
            <li className="list-item" style={{ marginBottom: "10px" }}>
              <p>{post.content}</p>
              <button
                className="btn btn-danger"
                style={{ float: "right" }}
                onClick={() => handleDeletePost(post._id)}
              >
                Delete Post
              </button>
              <button
                className="btn btn-warning"
                style={{ float: "right" }}
                onClick={() => setPost(post)}
              >
                Edit Post
              </button>

              {/* Add comment input form */}
              <input
                value={comment.text}
                className="form-control"
                onChange={(e) => setComment({ ...comment, text: e.target.value })}
              />
              <br />
              <button className="btn btn-success" onClick={() => handleAddComment(post._id)}>
                Add Comment
              </button>

              {/* Display comments */}
              {comments
                .filter((c) => c.postId === post._id)
                .map((comment, commentIndex) => (
                  <div key={commentIndex}>
                    <p>{comment.text}</p>
                    <button
                      className="btn btn-danger"
                      style={{ float: "right" }}
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      Delete Comment
                    </button>
                    <button
                      className="btn btn-warning"
                      style={{ float: "right" }}
                      onClick={() => {
                        setComment(comment);
                      }}
                    >
                      Edit Comment
                    </button>
                  </div>
                ))}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PostList;
