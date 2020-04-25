import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { setIntegration } from '../features/authSlice';
import { setCurrentlyPlaying } from '../features/musicSlice';
import { enqueueMessage, dequeueMessage } from '../features/messagesSlice';
import { getNewMessage } from '../utils/messages/messageSelector';
import { setUser, setUserFetching, clearUser } from '../features/authSlice';
import firebase, { DB } from '../utils/firebase';
import * as Constants from "../constants/index";
import * as Selectors from '../selectors/index';


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
  const user = useSelector(Selectors.getUser);

  useEffect(() => {
    dispatch(setUserFetching(true));
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        let me = {
          uid: user.uid,
          name: user.displayName,
          photo: user.photoURL,
          email: user.email
        }
        // User is signed in.
        dispatch(setUser(me));
        dispatch(setUserFetching(false));
      } else {
        // No user is signed in.
        dispatch(clearUser());
        dispatch(setUserFetching(false));
        clearInterval(messageRef.current);
      }
    });
  }, []);

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

  const getMessagesFromDb = (ref: any) => {
    return ref.on("child_added", (snap: any) => {
      if (snap.val()) {
        dispatch(enqueueMessage(snap.val()));
      }
    });
  }

  useEffect(() => {
    messageRef.current = setInterval(async () => {
      let message = await getNewMessage();
      if(message && message.text){
        if(!message.public && user.uid) {
          firebase
            .database()
            .ref(DB.MESSAGES)
            .child(user.uid)
            .push()
            .set(message);
          if (message.mode && message.mode === "music") {
            dispatch(setCurrentlyPlaying(message.text));
          }
        } else if(message.public) {
          firebase.database().ref(DB.MESSAGES).child("public").push().set(message);
        }
      }
      dispatch(dequeueMessage());
    }, 30000);

    return () => {
      clearInterval(messageRef.current);
    }
  }, [user]);

  useEffect(() => {
    (() => {
      // if(user.uid){
      //   let privateRef = firebase.database().ref(DB.MESSAGES).child(user.uid);
      //   getMessagesFromDb(privateRef);
      // }
      let publicRef = firebase.database().ref(DB.MESSAGES).child("public");
      getMessagesFromDb(publicRef);
    })();
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
