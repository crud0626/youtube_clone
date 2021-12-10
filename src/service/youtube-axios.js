import axios from "axios";

export default class YoutubeAxios {
    constructor(key) {
        this.key = key;
        this.requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }
    }

    async getMostPopular() {
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`, 
            this.requestOptions
        );
        const result = await response.json();
        return result.items;
    }
}