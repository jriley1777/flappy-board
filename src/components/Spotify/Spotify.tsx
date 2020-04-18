import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import firebase, {DB} from '../../utils/firebase';

import Button from '@material-ui/core/Button'

const Spotify = () => {
    const [token, setToken] = useState('');
    const location = useLocation();
    const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

    const handleRedirect = async (code: string) => {
        const data = {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
          json: true,
        };

        const headers = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              new Buffer(clientId + ":" + clientSecret).toString("base64"),
          }
        };

        try {
          const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            qs.stringify(data),
            headers,
          );
          setToken(response.data.access_token);
          getCurrentlyPlaying(response.data.access_token);
        } catch (error) {
          console.log(error);
        }

    }

    const getCurrentlyPlaying = async (token: string) => {
        if(!token) return null;
        const url = "https://api.spotify.com/v1/me/player/currently-playing";
        const headers = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(
            url,
            headers
        );
        if(response.data){
           let name = response.data.item.name;
           let artists = response.data.item.artists.map((x) => x.name);
           let message = artists.join(" ") + " - " + name;
           firebase.database().ref(DB.MESSAGES).push().set({
             text: message,
           }); 
        }
    }

    useEffect(() => {
        if(token){
            setInterval(getCurrentlyPlaying(token), 30000)
        }
    })

    useEffect(() => {
        if(code && typeof code === 'string'){
            handleRedirect(code)
        }
    }, [code])

    const handleLogin = () => {
        let scope = encodeURIComponent("user-read-currently-playing user-read-playback-state");
        let queryString = `client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location.href = "https://accounts.spotify.com/authorize?" + queryString;
    }
    return token ? (
        <>
            <div>Token:  {token}</div>
            <Button variant="contained" color="primary" onClick={() => getCurrentlyPlaying(token)}>Get Playing</Button>
        </>
    ) : (
        <Button color="primary" variant="contained" onClick={handleLogin}>Login with Spotify</Button>
    )
};

export default Spotify;