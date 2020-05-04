import { getCurrentlyPlaying } from '../integrations/spotify';

const options = {
    SPOTIFY_ACTIVE_TRACK: 'SPOTIFY_ACTIVE_TRACK',
}

//single entry point for next message
export const getNewMessage = async (num?: number) => {
    let selection = num || Math.floor(Math.random() * Object.keys(options).length) + 1;
    switch(selection){
        case 1:
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
        default:
            return;
    }
}