// import axios from "axios";

// export const SPOTIFY_API = "https://api.spotify.com/v1";
// export const API_KEY = process.env.REACT_APP_SPOTIFY_API_KEY;
// export const API_SECRETKEY = process.env.REACT_APP_SPOTIFY_API_SECRETKEY;

// export const findAlbums = async (searchTerm) => {
//   try {
//     const response = await axios.get(`${SPOTIFY_API}/search`, {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//       },
//       params: {
//         q: searchTerm,
//         type: "album",
//       },
//     });
//     return response.data.albums.items;
//   } catch (error) {
//     console.error("Error searching Spotify albums:", error);
//     throw error;
//   }
// };

// // Add more functions as needed
