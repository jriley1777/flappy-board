import * as functions from "firebase-functions";
import oauth from 'simple-oauth2';

const spotifyApi = "https://accounts.spotify.com";
/* process.env.URL from netlify BUILD environment variables */
const siteUrl = "http://localhost:3000/admin/";

export let config = {
  /* values set in terminal session or in netlify environment variables */
  clientId: functions.config().spotify_oauth.client_id,
  clientSecret: functions.config().spotify_oauth.client_secret,
  /* Intercom oauth API endpoints */
  tokenHost: spotifyApi,
  authorizePath: `${spotifyApi}/authorize`,
  tokenPath: `${spotifyApi}/api/token`,
  profilePath: `${spotifyApi}/me/`,
  /* redirect_uri is the callback url after successful signin */
  app_redirect: siteUrl,
  redirect_uri: functions.config().spotify_oauth.redirect_uri,
};

function authInstance(credentials: any) {
  if (!credentials.client.id) {
    throw new Error("MISSING REQUIRED ENV VARS. Please set INTERCOM_CLIENT_ID");
  }
  if (!credentials.client.secret) {
    throw new Error(
      "MISSING REQUIRED ENV VARS. Please set INTERCOM_CLIENT_SECRET"
    );
  }
  // return oauth instance
  return oauth.create(credentials);
}

export default authInstance({
  client: {
    id: functions.config().spotify_oauth.client_id,
    secret: functions.config().spotify_oauth.client_secret,
  },
  auth: {
    tokenHost: "https://accounts.spotify.com/",
    tokenPath: "/api/token",
    authorizePath: "/authorize",
  },
});