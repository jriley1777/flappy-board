import qs from "qs";
import express from 'express';
import oauth, { config } from './config/spotify.config';

export const authorize = (req: express.Request, res: express.Response) => {
  config.app_redirect = req.get("Referrer") || "";
  if (config.app_redirect) {
    const scope = "user-read-currently-playing user-read-playback-state";
    const authorizationURI = oauth.authorizationCode.authorizeURL({
      redirect_uri: config.redirect_uri,
      /* Specify how your app needs to access the user’s account. http://bit.ly/intercom-scopes */
      scope: encodeURIComponent(scope),
      /* State helps mitigate CSRF attacks & Restore the previous state of your app */
      state: "",
    });
    res.redirect(authorizationURI);
  }
};

export const handleRedirect = (req: express.Request, res: express.Response) => {
  let code = req.query.code.toString() || "";
  oauth.authorizationCode
    .getToken({
      code,
      redirect_uri: config.redirect_uri,
    })
    .then((result) => {
      res.redirect(config.app_redirect + "?" + qs.stringify(result));
    });
}

export default {
  authorize,
  handleRedirect
}