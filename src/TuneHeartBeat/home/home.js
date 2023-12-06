// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { FaComment, FaThumbsUp } from "react-icons/fa"; // Import the thumbs-up icon
import * as postsClient from "../posts/client";
import * as commentsClient from "../comments/client";
import * as postLikesClient from "../likes/client"; // Import the post likes client
import * as commentLikesClient from "../likes/client"; // Import the comment likes client
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const { currentUser } = useSelector((state) => state.userReducer);
  const [editingPostContent, setEditingPostContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If the user is signed in, fetch all their posts
        if (currentUser && currentUser._id) {
          const fetchedPosts = await postsClient.fetchPosts(currentUser._id);
          setPosts(fetchedPosts);
        } else {
          // If the user is signed out, fetch only the first 7 posts from different post IDs
          const randomPostIds = ["65708dcb1394ba3eb3749ba1", "65708a64e93abbe2194402db", "6570955202fef48dc847a1a4"]; 
          const postsFromDifferentIds = await Promise.all(
            randomPostIds.map(async (postId) => await postsClient.fetchPostById(postId))
          );
          setPosts(postsFromDifferentIds.slice(0, 7)); // Slice to get the first 7 posts
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [currentUser]);

  // Add a new post
  const addPost = async () => {
    if (newPost.trim() !== "") {
      const userId = currentUser._id;
      try {
        const createdPost = await postsClient.createPost(userId, { content: newPost });
        setPosts([...posts, createdPost]);
        setNewPost("");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  // Add a new comment
  const addComment = async (postId) => {
    if (newComment.trim() !== "") {
      try {
        // Ensure the currentUser is available
        if (!currentUser || !currentUser._id) {
          console.error("Current user not available");
          return;
        }

        const userId = currentUser._id;

        // Updated createComment request to include userId and use "content" instead of "text"
        const createdComment = await commentsClient.createComment(postId, {
          content: newComment,
          user: userId,
          postID: postId,
        });

        setComments({
          ...comments,
          [postId]: [...(comments[postId] || []), createdComment],
        });
        setNewComment("");
      } catch (error) {
        console.error("Error creating comment:", error);
      }
    }
  };

  // Delete a post
  const deletePost = async (postId) => {
    try {
      await postsClient.deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Delete a comment
  const deleteComment = async (postId, commentId) => {
    try {
      await commentsClient.deleteComment(commentId);
      setComments({
        ...comments,
        [postId]: comments[postId].filter((comment) => comment._id !== commentId),
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Like a post
  const likePost = async (postId) => {
    try {
      // Ensure the currentUser is available
      if (!currentUser || !currentUser._id) {
        console.error("Current user not available");
        return;
      }

      const userId = currentUser._id;

      // Call the function to like the post
      await postLikesClient.createUserLikesPost(userId, postId);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Like a comment
  const likeComment = async (commentID) => {
    try {
      // Ensure the currentUser is available
      if (!currentUser || !currentUser._id) {
        console.error("Current user not available");
        return;
      }

      const userId = currentUser._id;

      // Call the function to like the comment
      await commentLikesClient.createUserLikescomment(userId, commentID);
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  // Update a post
  const updatePost = async (postId) => {
    try {
      const updatedPost = await postsClient.updatePost({
        _id: postId,
        content: editingPostContent, // Use the editingPostContent value for updating
      });
      setPosts(posts.map((post) => (post._id === postId ? updatedPost : post)));
      setEditingPostContent(""); // Clear the editingPostContent after updating
      setEditingPostId(null); // Reset the editing state
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Start editing a post
  const startEditing = (postId) => {
    setEditingPostId(postId);
    setEditingPostContent(posts.find((post) => post._id === postId).content);
  };

  return (
    <Container className="mt-5" style={{ overflowY: "auto", height: "600px", backgroundColor: "#cfe2f3" }}>
      <h1 className="text-center mb-4">HOME</h1>

      {/* Form to add a new post */}
      {currentUser && currentUser._id && (
        <Card className="mt-4 p-4" style={{ backgroundColor: "#ffffff" }}>
          <Form>
            
            <Form.Group controlId="newPost">
              <Form.Control
                as="textarea"
                rows={3}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Write a new post..."
                style={{ backgroundColor: "#e9ecef" }}
              />
            </Form.Group>
            <Button variant="primary" onClick={addPost}>
              Post
            </Button>
          </Form>
        </Card>
      )}

      {/* Display existing posts */}
      {posts.map((post, index) => (
        <Card key={index} className="mt-4 p-4" style={{ backgroundColor: "#ffffff" }}>
          {editingPostId === post._id ? (
            // Form to edit a post
            <Form>
              <Form.Group controlId={`editPost-${index}`}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editingPostContent}
                  onChange={(e) => setEditingPostContent(e.target.value)} // Use editingPostContent
                  style={{ backgroundColor: "#e9ecef" }}
                />
              </Form.Group>
              <Button variant="warning" onClick={() => updatePost(post._id)} className="mr-2">
                Update
              </Button>
              <Button variant="secondary" onClick={() => setEditingPostId(null)}>
                Cancel
              </Button>
            </Form>
          ) : (
            // Display post content and comments
            <div>
              <Card.Text>{post.content}</Card.Text>
              <Container className="mt-3">
                {/* Display the first name of the poster */}
                <p>Posted by: {currentUser && currentUser.firstName}</p>

                {/* Button to like the post */}
                {currentUser && currentUser._id && (
                  <Button variant="primary" onClick={() => likePost(post._id)} className="mr-2 float-end">
                    <FaThumbsUp /> Like post
                  </Button>
                )}

                {/* Form to add a new comment */}
                <Form>
                  {currentUser && currentUser._id && (
                    <Form.Group controlId={`newComment-${index}`}>
                      <Form.Control
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        style={{ backgroundColor: "#e9ecef" }}
                      />
                    </Form.Group>
                  )}
                  {currentUser && currentUser._id && (
                    <Button variant="outline-primary" onClick={() => addComment(post._id)}>
                      <FaComment /> Comment
                    </Button>
                  )}
                  {/* Button to delete the post */}
                  {currentUser && currentUser._id && (
                    <Button variant="danger" onClick={() => deletePost(post._id)} className="ml-2">
                      Delete Post
                    </Button>
                  )}
                </Form>

                {/* Display existing comments */}
                {comments[post._id] &&
                  comments[post._id].map((comment, commentIndex) => (
                    <div key={commentIndex} className="mt-2" style={{ backgroundColor: "#e9ecef", padding: "8px" }}>
                      <span>{comment.content}</span>
                      {/* Button to like the comment */}
                      {currentUser && currentUser._id && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="mr-2 float-end"
                          onClick={() => likeComment(comment._id)}
                        >
                          <FaThumbsUp /> Like comment
                        </Button>
                      )}
                      {/* Button to delete the comment */}
                      {currentUser && currentUser._id && (
                        <Button
                          variant="danger"
                          size="sm"
                          className="ml-2 float-end"
                          onClick={() => deleteComment(post._id, comment._id)}
                        >
                          Delete Comment
                        </Button>
                      )}
                    </div>
                  ))}
              </Container>
            </div>
          )}
        </Card>
      ))}
    </Container>
  );
}

export default Home;
