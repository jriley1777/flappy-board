import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import firebase from '../../utils/firebase';
import { useSelector } from 'react-redux';
import * as Selectors from '../../selectors/index';

const Login = () => {
    const user = useSelector(Selectors.getUser);
    const isFetching = useSelector(Selectors.getUserFetching);

    const loginWithGoogle = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }
    const handleLogout = () => {
      firebase.auth().signOut();
    }

    return Object.keys(user).length === 0 ? (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={loginWithGoogle} disabled={isFetching}>
            {isFetching ? '...': 'Login with Google'}
          </Button>
        </Grid>
      </Grid>
    ) : (
     <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
       <Grid item>
         Welcome back {user.name!}
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleLogout} disabled={isFetching}>Logout</Button>
        </Grid>
      </Grid>
    );
};

export default Login;