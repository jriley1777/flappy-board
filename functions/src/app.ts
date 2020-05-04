import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import integrations from './oauth/index';
import publicFeed from './public/index';

export const adminApp = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://processing-editor.firebaseio.com",
});

//firebase functions:config:get > .runtimeconfig.json

const app = express();
app.use(cors({ origin: true }));

app.get("/", (req: express.Request, res: express.Response) =>
    res.send("Hello world")
);
app.get("/integrations/spotify/", integrations.spotify.authorize);
app.get("/integrations/spotify/redirect/", integrations.spotify.handleRedirect);
app.get("/public/news/top/us/", publicFeed.news.getTopHeadlinesUS); //has cron scheduler every 30 min.
app.get("/public/add_message", publicFeed.addMessageToPublicFeed);

export default app;
