import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import * as userClient from "../users/client";
import * as likesClient from "../likes/client";

const API_KEY = "da577f37b93545e1b6773ae43ea870d2";
const API_SECRETKEY = "e8ca7d12a9c447108a6b98ca6bea8784";

function Details() {
  const [currentUser, setCurrentUser] = useState(null);
  const { albumId } = useParams();
  const [accessToken, setAccessToken] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState([]);
  const [songLikes, setSongLikes] = useState([]);

  const fetchUser = async () => {
    try {
      const user = await userClient.account();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    }
  };



  const createUserLikesSong = async (songId) => {
    try {
      const _likes = await likesClient.createUserLikesSong(currentUser._id, songId);
      console.log('New Likes:', _likes);
  
      // Update likes for the specific song
      setSongLikes((prevSongLikes) => ({
        ...prevSongLikes,
        [songId]: [_likes, ...(prevSongLikes[songId] || [])],
      }));
  
      // Update the general likes state
      setLikes((prevLikes) => [_likes, ...prevLikes]);
    } catch (error) {
      console.error("Error creating user likes song:", error);
    }
  };
  const fetchLikes = async (songId) => {
    try {
      const likes = await likesClient.findUsersThatLikeSong(songId);

      setSongLikes((prevsongLikes) => ({
        ...prevsongLikes,
        [songId]: likes,
      }));
    } catch (error) {
      console.error("Error fetching likes for song:", error);
    }
  };
  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        API_KEY +
        "&client_secret=" +
        API_SECRETKEY,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);

        if (albumId && data.access_token) {
          searchAPI(data.access_token);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching access token:", error);
        setLoading(false);
      });

    fetchUser();
  }, []);

  async function searchAPI(token) {
    try {
      var searchParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const songsResponse = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}/tracks`,
        searchParameters
      );

      if (!songsResponse.ok) {
        const errorData = await songsResponse.json();
        console.error("Error fetching album details:", errorData);
        return;
      }

      var songsData = await songsResponse.json();
      var songsArray = songsData.items;

      console.log("Songs Data:", songsData);

      setSongs(songsArray);
      setLoading(false);

      songsArray.forEach((song) => {
        fetchLikes(song.id);
      });
    } catch (error) {
      console.error("Error fetching album details:", error);
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 style={{ color: "white", textAlign: "left" }}>ALBUM SONGS LIST</h1>

      <div
        className="mx-2 row row-cols-4"
        style={{ maxHeight: "550px", overflowY: "auto" }}
      >
        {songs.map((song, i) => (
          <Card key={i}>
            <Card.Body>
              <Card.Title>
                {song.name}{" "}
                {currentUser && (
                  <button
                    onClick={() => createUserLikesSong(song.id)}
                    className="btn btn-warning float-end"
                  >
                    Like
                  </button>
                )}
              </Card.Title>
              <p>Duration: {formatDuration(song.duration_ms)} m</p>
              <p>Artist: {song.artists.map((artist) => artist.name).join(", ")}</p>
              <p> Preview:
              <a href={song.preview_url} >
                Listen
              </a></p>
              <div style={{ overflowY: "auto", overflowX: "auto", width: "250px", height: "200px" }}>
                <h2>Likes</h2>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {songLikes[song.id]?.map((like, index) => (
                      <tr key={index}>
                        
                        <Link to={`/TuneHeartBeat/Account/${like.user._id}`}>
                          <td>
                            {like.user.username}
                            </td>
                          </Link>
                        <td>{like.user.firstName}</td>
                        <td>{like.user.lastName}</td>
                        <td>{like.user.email}</td>
                        <td>{like.user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

function formatDuration(durationInMs) {
  const seconds = Math.floor((durationInMs / 1000) % 60);
  const minutes = Math.floor((durationInMs / 60000) % 60);

  return `${minutes}:${seconds}`;
}

export default Details;
