import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { setIntegration } from '../../features/authSlice';
import Button from '@material-ui/core/Button';
import {
  authorize,
  getSpotifyTokens,
} from "../../utils/spotify";
import * as Selectors from '../../selectors/index';

const Spotify = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(Selectors.getSpotifyToken);
  const playing = useSelector(Selectors.getCurrentlyPlayingAudio);
  const location = useLocation();
  const { code: authCode } = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    //code if redirect
    if (authCode && typeof authCode === "string") {
      getSpotifyTokens("authorization_code", authCode).then((data) => {
        if (data) {
          localStorage.setItem("spotifyAccessToken", data.access_token);
          localStorage.setItem("spotifyRefreshToken", data.refresh_token);
          dispatch(
            setIntegration({
              spotify: {
                access_token: data.access_token,
                refresh_token: data.refresh_token,
              },
            })
          );
        }
      });
    }
  }, [authCode]);

  return accessToken ? (
      <div>Current: {playing}</div>
  ) : (
    <Button color="primary" variant="contained" onClick={authorize}>
      Login with Spotify
    </Button>
  );
};

export default Spotify;