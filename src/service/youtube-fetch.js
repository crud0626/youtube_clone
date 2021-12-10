export default class YoutubeFetch {
    constructor(key) {
        this.key = key;
        this.requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }
    }

    async getMostPopular() {
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=25&fields=items(id,snippet,contentDetails,statistics)&key=${this.key}`, 
            this.requestOptions
        );
        const result = await response.json();
        return result.items;
    }

    async getSearchVideos(query) {
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet,contentDetails,statistics&maxResults=25&q=${query}&fields=items(id,snippet,contentDetails,statistics)&key=${this.key}`, 
            this.requestOptions
        );
        const result = await response.json();
        return result.items;
    }
}