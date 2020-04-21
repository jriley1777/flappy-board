import axios from "axios";

export const requestRefreshToken = () => {};

export const getCurrentlyPlaying = async (token: string) => {
  if (!token) return null;
  const url = "https://api.spotify.com/v1/me/player/currently-playing";
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios
    .get(url, headers)
    .then((response) => {
      if (response.data) {
        let name = response.data.item.name;
        let artists = response.data.item.artists
          .map((artist: string) => artist.name)
          .join(",");
        return { name, artists };
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return response;
};
