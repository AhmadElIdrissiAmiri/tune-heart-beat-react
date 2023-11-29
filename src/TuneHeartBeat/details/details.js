import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

const API_KEY = "da577f37b93545e1b6773ae43ea870d2";
const API_SECRETKEY = "e8ca7d12a9c447108a6b98ca6bea8784";

function Details() {
  const { albumId } = useParams();
  const [accessToken, setAccessToken] = useState("");
  const [songs, setSongs] = useState([]);

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

        // Check if albumId is available before calling searchAPI
        if (albumId) {
          searchAPI();
        }
      });
  }, [albumId]); // Include albumId as a dependency so that it re-fetches when the albumId changes

  async function searchAPI() {
    try {
      var searchParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
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
  
      const songsData = await songsResponse.json();
      const songsArray = songsData.items;
  
      console.log("Songs Data:", songsData);
  
      setSongs(songsArray);
    } catch (error) {
      console.error("Error fetching album details:", error);
    }
  }
  

  return (
    <div>
      <h1 style={{ color: "white", textAlign: "left" }}>
        ALBUM SONGS LIST
      </h1>

      <div className="mx-2 row row-cols-4">
        {songs.map((song, i) => (
          <Card >
            <Card.Body>
            <Card.Img src={song.images} />
              <Card.Title>{song.name}</Card.Title>
              <p>Duration: {song.duration_ms} ms</p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Details;
