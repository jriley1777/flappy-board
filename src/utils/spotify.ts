import axios from 'axios';
import qs from 'qs';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirectUri =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SPOTIFY_REDIRECT_URI
    : "http://localhost:3000/admin";

export const authorize = () => {
    const scope = "user-read-currently-playing user-read-playback-state";
    let encodedScope = encodeURIComponent(scope);
    let queryString = `client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodedScope}`;
    //external link to authorize
    window.location.href =
    "https://accounts.spotify.com/authorize?" + queryString;
};

export const getSpotifyTokens = async (grant_type: string, code?: string) => {
  const data = {
    grant_type,
    code: code || null,
    redirect_uri: redirectUri,
    json: true,
  };

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + new Buffer(clientId + ":" + clientSecret).toString("base64"),
    },
  };
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(data),
      headers
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentlyPlaying = async (token: string) => {
  if (!token) return null;
  const url = "https://api.spotify.com/v1/me/player/currently-playing";
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(url, headers).then(response => {
    if (response.data) {
      let name = response.data.item.name;
      let artists = response.data.item.artists
        .map((artist: string) => artist.name)
        .join(",");
      return { name, artists };
    }
  }).catch(error => {
    if (error.response.status) {
      try {
        getSpotifyTokens("refresh_token").then(
          (data) => {
            if (data) {
              localStorage.setItem("spotifyAccessToken", data.access_token);
              localStorage.setItem("spotifyRefreshToken", data.refresh_token);
            }
          });
        } catch(err) {
          console.error(err);
          localStorage.removeItem("spotifyAccessToken");
          localStorage.removeItem("spotifyRefreshToken");
        }
      }
  });
  return response;
};