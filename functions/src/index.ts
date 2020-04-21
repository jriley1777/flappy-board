import * as functions from 'firebase-functions';
import express from 'express';
import cors from "cors";
import qs from 'qs';
import spotify, { config as spotifyConfig } from './oauth/spotify.config';

const app = express();
app.use(cors({ origin: true }));
const main = express();
main.use('/v1', app);
export const api = functions.https.onRequest(main);

export const timedDelete = functions.database.ref('/messages/{messageId}/').onCreate((snapshot, context) => {
    return setTimeout(() => {
        snapshot.ref.remove();
    }, 10000);
});

export const handleSpotifyAuth = app.get("/spotify/auth/", (req, res) => {
    spotifyConfig.app_redirect = req.get("Referrer") || '';
    if (spotifyConfig.app_redirect) {
        const scope = "user-read-currently-playing user-read-playback-state";
        const authorizationURI = spotify.authorizationCode.authorizeURL({
            redirect_uri: spotifyConfig.redirect_uri,
            /* Specify how your app needs to access the user’s account. http://bit.ly/intercom-scopes */
            scope: encodeURIComponent(scope),
            /* State helps mitigate CSRF attacks & Restore the previous state of your app */
            state: "",
        });
        res.redirect(authorizationURI);
    }
})

export const handleSpotifyRedirect = app.get("/spotify/redirect/", (req, res) => {
    let code = req.query.code.toString() || '';
    spotify.authorizationCode.getToken({
        code,
        redirect_uri: spotifyConfig.redirect_uri,
    }).then(({ access_token, refresh_token }) => {
        res.redirect(
            spotifyConfig.app_redirect + "?" + 
            qs.stringify({
                access_token,
                refresh_token
            })
        )
    });
}); 