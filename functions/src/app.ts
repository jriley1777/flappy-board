import express from 'express';
import cors from 'cors';
import integrations from './oauth/index';

const app = express();
app.use(cors({ origin: true }));

app.get("/integrations/spotify/", integrations.spotify.authorize);
app.get("/integrations/spotify/redirect/", integrations.spotify.handleRedirect);

export default app;
