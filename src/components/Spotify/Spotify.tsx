import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { setIntegration } from '../../features/authSlice';
import Button from '@material-ui/core/Button';
import * as Selectors from '../../selectors/index';

const Spotify = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector(Selectors.getSpotifyToken);
  const playing = useSelector(Selectors.getCurrentlyPlayingAudio);
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    //code if redirect
    if (params.access_token && params.refresh_token) {
      localStorage.setItem("spotifyAccessToken", params.access_token);
      localStorage.setItem("spotifyRefreshToken", params.refresh_token);
      dispatch(
        setIntegration({
          spotify: {
            access_token: params.access_token,
            refresh_token: params.refresh_token,
          },
        })
      );
      history.replace(history.location.pathname);
      console.log(history);
    }
  }, []);

  return accessToken ? (
    <div>Current: {playing}</div>
  ) : (
    <Button
      color="primary"
      variant="contained"
      href="https://us-central1-processing-editor.cloudfunctions.net/api/v1/spotify/auth/"
    >
      Login with Spotify
    </Button>
  );
};

export default Spotify;