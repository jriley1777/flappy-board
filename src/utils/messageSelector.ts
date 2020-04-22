import { getTopHeadlines } from './integrations/news';
import { getCurrentlyPlaying } from './integrations/spotify';
import { getCryptoPrice } from './integrations/crypto';

const options = {
    NEWS_HEADLINES: 'NEWS_HEADLINES',
    SPOTIFY_ACTIVE_TRACK: 'SPOTIFY_ACTIVE_TRACK',
    CRYPTO_PRICE: 'CRYPTO_PRICE'
}

//single entry point for next message
export const getNewMessage = async () => {
    let selection = Math.floor(Math.random() * Object.keys(options).length) + 1;
    switch(selection){
        case 1:
            return await getTopHeadlines('us').then((headlines: any) => {
               let randNum = Math.floor(Math.random() * headlines.length); 
               return {
                   text: headlines[randNum].title,
                   mode: 'news'
               }
            }).catch(error => console.error(error))
        case 2:
            let spotify = localStorage.getItem("spotify");
            if(spotify) {
                return await getCurrentlyPlaying(JSON.parse(spotify).access_token!)
                .then((song) => {
                    return {
                        text: song.name + " - " + song.artists,
                        mode: 'music',
                        source: 'spotify',
                        url: song.url
                    }
                }).catch(() => {
                    localStorage.removeItem("spotify");
                })
            } else {
                return;
            }
        case 3:
            return await getCryptoPrice('BTC')
            .then(data => {
                return { text: data, mode: 'crypto' }
            }).catch(error => console.error(error))
        default:
            return;
    }
}