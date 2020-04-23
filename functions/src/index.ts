import * as functions from 'firebase-functions';
import express from 'express';
import app from './app';

const main = express();
main.use('/v1', app);
export const api = functions.https.onRequest(main);

export const timedDelete = functions.database
  .ref("/messages/{messageId}/")
  .onCreate((snapshot, context) => {
    return setTimeout(() => {
      snapshot.ref.remove();
    }, 29000);
  });