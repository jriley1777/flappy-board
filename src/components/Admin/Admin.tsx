import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import firebase, { DB } from "../../utils/firebase";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PublicIcon from "@material-ui/icons/Public";
import FavoriteIcon from '@material-ui/icons/Favorite';
import AppsIcon from "@material-ui/icons/Apps";

import Spotify from '../Spotify/Spotify';
import Login from '../Login/Login';

import * as Selectors from '../../selectors/index';


const StyledAdmin = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    font-family: 'PT Display', serif;
    background: white;
    color: #0a0a0a;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #0a0fda
  }
`;

const StyledHeader = styled.h1`
  font-size: 1.25rem;
  padding-left: 20px;
  width: 100%;
  height: 2rem;
  border-bottom: 1px solid black;
`;

const StyledGrid = styled(Grid)`
  margin-top: 2rem !important;

  > * {
    width: 90% !important;
    max-width: 600px !important;
  }
`;




const Admin = () => {
    const [ message, setMessage ] = useState("");
    const messagesDb = firebase.database().ref(DB.MESSAGES);
    const [showNav, setShowNav] = useState(true);
    const user = useSelector(Selectors.getUser);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(message){
            messagesDb.child("public").push().set({
                text: message, 
                public: true
            })
            setMessage("")
        }
    }

    const renderBottomNav = () => {
      return (
        <BottomNavigation
          style={{ position: "fixed", bottom: 0, width: "100%" }}
          showLabels
        >
          <BottomNavigationAction label="Settings" icon={<PublicIcon />} />
          <BottomNavigationAction label="Messages" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Apps" icon={<AppsIcon />} />
        </BottomNavigation>
      );
    }

    const renderApps = () => {
      return user.uid ? (
        <>
          <Grid item>
            <h3>Connected Apps</h3>
          </Grid>
          <Grid item>
            <div>
              <h4>Spotify</h4>
              <Spotify />
            </div>
          </Grid>
        </>
      ) : (
        <Grid item>
          <p>Login to see integrations.</p>
        </Grid>
      );
    }

    return (
      <StyledAdmin>
        <StyledHeader>
          <StyledLink to="/">Flappy Board</StyledLink>
        </StyledHeader>
        <form onSubmit={handleSubmit} autoComplete="off">
          <StyledGrid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Login />
            </Grid>
            <Grid item>
              <p>
                Add a message to the public board below.
              </p>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="Add message to board"
                type="text"
                placeholder="New Message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setShowNav(false)}
                onBlur={() => setShowNav(true)}
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                color="primary"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
            { renderApps() }
          </StyledGrid>
        </form>
        {showNav && renderBottomNav()}
      </StyledAdmin>
    );
};

export default Admin;