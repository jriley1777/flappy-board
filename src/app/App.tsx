import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { setIntegration } from '../features/authSlice';
import { setCurrentlyPlaying, clearCurrentlyPlaying } from '../features/musicSlice';
import { getCurrentlyPlaying } from '../utils/spotify';
import firebase, { DB } from '../utils/firebase';
import * as Selectors from '../selectors/index';
import * as Constants from "../constants/index";


const StyledApp = styled.div`
  background: #1d1d1d;
  color: #ded;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector(Selectors.getSpotifyToken);
  const updatePlaying: any = useRef();
  const updateCurrentlyPlaying = (accessToken: string) => {
    getCurrentlyPlaying(accessToken).then((song) => {
      if (song) {
        let track = song.name + " - " + song.artists;
        dispatch(setCurrentlyPlaying(track));
        firebase.database().ref(DB.MESSAGES).push().set({ text: track, mode: 'music', source: 'spotify' });
      } else {
        dispatch(clearCurrentlyPlaying());
      }
    });
  };

  useEffect(() => {
    const access_token = localStorage.getItem("spotifyAccessToken");
    const refresh_token = localStorage.getItem("spotifyRefreshToken");
    if (access_token) {
      dispatch(setIntegration({ 
        spotify: { 
          access_token,
          refresh_token
        } 
      }));
      updateCurrentlyPlaying(access_token);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      updatePlaying.current = setInterval(() => {
        updateCurrentlyPlaying(accessToken);
      }, 30000);
    } else {
      clearInterval(updatePlaying.current);
    }
  }, [accessToken]);

  const renderRoutes = () => {
    return Constants.ROUTES.map(route => (
        <Route 
          key={route.name}
          path={route.path} 
          exact={route.exact} 
          component={route.component} />
      )
    )
  };

  return (
    <StyledApp>
      <Switch>
        { renderRoutes() }
      </Switch>
    </StyledApp>
  );
}

export default App;
