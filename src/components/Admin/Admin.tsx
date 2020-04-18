import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PublicIcon from "@material-ui/icons/Public";
import FavoriteIcon from '@material-ui/icons/Favorite';
import AppsIcon from "@material-ui/icons/Apps";

import Spotify from '../Spotify/Spotify';

import firebase, { DB } from '../../utils/firebase';

const StyledAdmin = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    font-family: 'PT Display', serif;
    background: white;
    color: #0a0a0a;
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(message){
            messagesDb.push().set({
                text: message
            })
            setMessage("")
        }
    }

    return (
      <StyledAdmin>
        <StyledHeader>Flappy Board</StyledHeader>
        <form onSubmit={handleSubmit} autoComplete="off">
          <StyledGrid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <p>
                Welcome to the admin page for Flappy Board. Add a message to the
                public board below.
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
            <Grid item>
              <h3>Connected Apps</h3>
            </Grid>
            <Grid item>
              <div>
                <h4>Spotify</h4>
                <Spotify />
              </div>
            </Grid>
          </StyledGrid>
        </form>
        {/* <BottomNavigation
          style={{ position: "fixed", bottom: 0, width: "100%"}}
          showLabels
        >
          <BottomNavigationAction label="Public" icon={<PublicIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Connections" icon={<AppsIcon />} />
        </BottomNavigation> */}
      </StyledAdmin>
    );
};

export default Admin;