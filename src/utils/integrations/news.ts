import axios from 'axios';
import qs from 'qs';

export const getTopHeadlines = async (country: string) => {
    const params = {
        country: country,
        apiKey: "35a25fa3467e44f6974f39ccec0ed8d9"
    }
    return await axios.get(
      "https://newsapi.org/v2/top-headlines?" + qs.stringify(params)
    ).then(({ data }) => {
        return data.articles.map((article: any) => {
            return { title: article.title, mode: 'news'};
        })
    }).catch(error => error);
}