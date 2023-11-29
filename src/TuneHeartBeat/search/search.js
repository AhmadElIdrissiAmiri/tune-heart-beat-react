import React, { useState, useEffect } from "react";
import "./search.css";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const API_KEY = "da577f37b93545e1b6773ae43ea870d2";
const API_SECRETKEY = "e8ca7d12a9c447108a6b98ca6bea8784";

function Search() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search || "Adele");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

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
  }, []); // Empty dependency array to ensure it runs only once on mount

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
            <Link
              key={i}
              to={`/TuneHeartBeat/Details/${album.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card>
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
