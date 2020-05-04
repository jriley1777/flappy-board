import * as news from './news';
import * as crypto from './crypto';
import express from 'express';
import { adminApp } from '../app';

const getCryptoPrice = async () => {
    return await crypto.getCryptoPrice('BTC')
        .then(data => {
            return { 
                text: data, 
                mode: 'crypto',
                public: true
            }
        }).catch(error => console.error(error));
}

const getNewsArticle = async () => {
    const data = await adminApp
      .database()
      .ref("/content/news/top/us/")
      .once("value")
      .then((snap: any) => {
        if (snap.val()) {
          let array = Object.entries(snap.val()).map(([key, value]) => value);
          let selection = Math.floor(Math.random() * array.length);
          let article: any = array[selection];
          return {
            text: article.title,
            mode: "news",
            url: article.url,
            public: true,
          };
        } else {
            return {};
        }
      })
      .catch((error) => console.error(error));
    return data;
}

const addMessageToPublicFeed = async (req: express.Request, res: express.Response) => {
    let selection = Math.floor(Math.random() * 2) + 1;
    let msg;
    adminApp.database().ref("/public").remove();
    switch(selection){
        case 1:
            msg = await getNewsArticle();
            adminApp.database().ref("/public").push().set(msg);
            return res.json(msg);
        case 2:
            msg = await getCryptoPrice();
            adminApp.database().ref("/public").push().set(msg);
            return res.json(msg);
        default:
            return;
    }
}

export default {
    addMessageToPublicFeed,
    news,
    crypto
}