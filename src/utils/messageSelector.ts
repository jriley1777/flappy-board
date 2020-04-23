import { getTopHeadlines } from './integrations/news';
import { getCurrentlyPlaying } from './integrations/spotify';
import { getCryptoPrice } from './integrations/crypto';
import firebase from '../utils/firebase';

const options = {
    NEWS_HEADLINES: 'NEWS_HEADLINES',
    SPOTIFY_ACTIVE_TRACK: 'SPOTIFY_ACTIVE_TRACK',
    CRYPTO_PRICE: 'CRYPTO_PRICE'
}

//single entry point for next message
export const getNewMessage = async () => {
    // let selection = Math.floor(Math.random() * Object.keys(options).length) + 1;
    let selection = 1;
    switch(selection){
        case 1:
            const data = await firebase
              .database()
              .ref("/content/news/top/us/")
              .once("value")
              .then((snap: any) => {
                if(snap.val()){
                    let array = Object.entries(snap.val()).map(([key, value]) => value);
                    let selection = Math.floor(Math.random() * array.length)
                    let article: any = array[selection];
                    return {
                        text: article.title,
                        mode: 'news',
                        url: article.url,
                        public: true
                    }
                }
              });
              return data;
        case 2:
            let spotify = localStorage.getItem("spotify");
            if(spotify) {
                return await getCurrentlyPlaying(JSON.parse(spotify).access_token!)
                .then((song) => {
                    if(song && song.name){
                        return {
                          text: song.name + " - " + song.artists,
                          mode: "music",
                          source: "spotify",
                          url: song.url,
                          public: false,
                        };
                    }
                })
            } else {
                return;
            }
        case 3:
            return await getCryptoPrice('BTC')
            .then(data => {
                return { 
                    text: data, 
                    mode: 'crypto',
                    public: true
                }
            }).catch(error => console.error(error))
        default:
            return;
    }
}