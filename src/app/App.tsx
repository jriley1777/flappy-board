import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { setIntegration } from '../features/authSlice';
import { getNewMessage } from '../utils/messageSelector';
import firebase, { DB } from '../utils/firebase';
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
  const messageRef: any = useRef();

  useEffect(() => {
    const spotify = localStorage.getItem("spotify");
    if (spotify) {
      let { access_token, refresh_token } = JSON.parse(spotify);
      dispatch(setIntegration({ 
        spotify: { 
          access_token,
          refresh_token
        } 
      }));
    }
  }, []);

  useEffect(() => {
    messageRef.current = setInterval(async () => {
      let message = await getNewMessage();
      console.log(message, message && message.mode);
      if(message){
        firebase.database().ref(DB.MESSAGES).push().set(message);
      }
    }, 30000); 
  }, []);

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
