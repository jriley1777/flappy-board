import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { setIntegration } from '../../features/authSlice';
import Button from '@material-ui/core/Button';
import * as Selectors from '../../selectors/index';
import { FUNCTIONS_API_HOST } from "../../utils/firebase";

const Spotify = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector(Selectors.getSpotifyToken);
  const playing = useSelector(Selectors.getCurrentlyPlayingAudio);
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    //code if redirect
    if (Object.keys(params).length > 0) {
      localStorage.setItem("spotify", JSON.stringify(params));
      dispatch(
        setIntegration({
          spotify: {
            access_token: params.access_token,
            refresh_token: params.refresh_token,
          },
        })
      );
      history.replace(history.location.pathname);
    }
  }, []);

  return accessToken ? (
    <div>Current: {playing}</div>
  ) : (
    <Button
      color="primary"
      variant="contained"
      href={`${FUNCTIONS_API_HOST}/v1/integrations/spotify/`}
    >
      Login with Spotify
    </Button>
  );
};

export default Spotify;