import React, { useState, useEffect } from "react";
import "./search.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as likesClient from "../likes/client";
import * as userClient from "../users/client";

const API_KEY = "da577f37b93545e1b6773ae43ea870d2";
const API_SECRETKEY = "e8ca7d12a9c447108a6b98ca6bea8784";

function Search() {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("Adele");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [likes, setLikes] = useState([]);
  const [albumLikes, setAlbumLikes] = useState({});

  const fetchUser = async () => {
    try {
      const user = await userClient.account();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    }
  };

  const createUserLikesAlbum = async (albumId) => {
    try {
      const _likes = await likesClient.createUserLikesAlbum(currentUser._id, albumId);
      
  
      // Update likes for the specific album
      setAlbumLikes((prevAlbumLikes) => ({
        ...prevAlbumLikes,
        [albumId]: [_likes, ...(prevAlbumLikes[albumId] || [])],
      }));
  
      // Update the general likes state
      setLikes((prevLikes) => [_likes, ...prevLikes]);
    } catch (error) {
      console.error("Error creating user likes album:", error);
    }
  };
  

  const fetchLikes = async (albumId) => {
    try {
      const likes = await likesClient.findUsersThatLikeAlbum(albumId);

      // Update likes for the specific album
      setAlbumLikes((prevAlbumLikes) => ({
        ...prevAlbumLikes,
        [albumId]: likes,
      }));
    } catch (error) {
      console.error("Error fetching likes for album:", error);
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
        // Call searchAPI when the component mounts
        searchAPI();
      });
    fetchUser();
  }, []); 

  async function searchAPI() {
    try {
      var searchParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      // Search for the artist
      var artistIDResponse = await fetch(
        "https://api.spotify.com/v1/search?q=" + searchTerm + "&type=artist",
        searchParameters
      );
      var artistIDData = await artistIDResponse.json();
      var artistID = artistIDData.artists.items[0].id;

      // Search for the albums of the artist
      var albumsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
        searchParameters
      );
      var albumsData = await albumsResponse.json();
      var albumsArray = albumsData.items;

      // Set the albums in state
      setAlbums(albumsArray);

      // Fetch likes for all albums in the search results
      albumsArray.forEach((album) => {
        fetchLikes(album.id);
      });
    } catch (error) {
      console.error("Error searching Spotify:", error);
    }
  }

  return (
    <div>
      <h1 style={{ color: "white", textAlign: "left" }}>SEARCH</h1>
      <br />
      <div className="inputButtonStyle">
        <input
          type="text"
          className="form-control "
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <button className="btn btn-success" onClick={searchAPI}>
          SEARCH
        </button>
      </div>
      <h1 style={{ color: "white", textAlign: "left" }}>RESULTS</h1>
      <div style={{ height: "400px", overflowY: "auto" }}>
        <div className="mx-2 row row-cols-4">
          {albums.map((album, i) => (
            <Card key={i}>
              <Link
                to={`/TuneHeartBeat/Details/${album.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card.Img src={album.images[0].url} />
              </Link>
              <Card.Body>
                <Card.Title>
                  {album.name}{" "}
                  {currentUser && (
                    <button
                      onClick={() => createUserLikesAlbum(album.id)}
                      className="btn btn-warning float-end"
                    >
                      Like
                    </button>
                  )}
                </Card.Title>
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
                      {albumLikes[album.id]?.map((like, index) => (
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
    </div>
  );
}

export default Search;
