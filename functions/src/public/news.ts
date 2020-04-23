import express from 'express';
import * as functions from 'firebase-functions';
import { adminApp } from "../app";
import axios from 'axios';
import qs from 'qs';

export const getTopHeadlinesUS = async (req: express.Request, res: express.Response) => {
    const params = {
        country: 'US',
        apiKey: functions.config().news_api.api_key,
    };
    return await axios
    .get("https://newsapi.org/v2/top-headlines?" + qs.stringify(params))
    .then(({ data }) => {
        adminApp.database().ref("/content/news/top/us").remove();
        const articles = data.articles.map((article: any) => {
            let data = {
              title: article.title,
              url: article.url,
              source: article.source.name,
              mode: "news",
            };
            adminApp.database().ref("/content/news/top/us").push().set(data);
            return data;
        });
        res.json(articles);
    })
    .catch((err) => res.status(400).json(err));
};