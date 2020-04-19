import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { setIntegration } from '../../features/authSlice';
import Button from '@material-ui/core/Button';
import {
  authorize,
  getSpotifyAccessToken,
} from "../../utils/spotify";
import * as Selectors from '../../selectors/index';

const Spotify = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(Selectors.getSpotifyToken);
  const playing = useSelector(Selectors.getCurrentlyPlayingAudio);
  const location = useLocation();
  const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
      //code if redirect
      if(code && typeof code === 'string'){
        getSpotifyAccessToken(code).then(token => {
          localStorage.setItem("spotifyAccessToken", token);
          dispatch(setIntegration({ spotify: { token } }));
        });
      }
  }, [code])

  return accessToken ? (
    <>
      <div>Current: {playing}</div>
    </>
  ) : (
    <Button color="primary" variant="contained" onClick={authorize}>
      Login with Spotify
    </Button>
  );
};

export default Spotify;