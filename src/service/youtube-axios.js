import axios from "axios";

export default class YoutubeAxios {
    constructor(key) {
        this.key = key;
        this.youtube = axios.create({
            baseURL: "https://youtube.googleapis.com/youtube/v3",
            params: {key: key},
        })
    }

    async getMostPopular() {
        const response = await this.youtube.get('videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                maxResults: 25,
                fields : 'items(id,snippet,contentDetails,statistics)',
            }
        })
        return response.data.items;
    }

    async getSearchVideos(query) {
        // part: 'snippet,contentDetails,statistics',
        // fields : 'items(id,snippet,contentDetails,statistics)',
        // search만으로는 안되는 것 같다. 비디오 id를 디테일하게 잡아주어야함.

        const response = await this.youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 25,
                q: query,
                type: 'video',
                fields : 'items(id,snippet)',
            }
        })
        response.data.items.map(item => item.id = item.id.videoId);
        return response.data.items;
    }

    async getCurrentComment(currentId) {
        const response = await this.youtube.get('commentThreads', {
            params: {
                part: 'snippet',
                maxResults: 20,
                order: 'relevance',
                videoId: currentId,
                fields: 'items'
            }
        })
        console.log(response.data.items);
        return response.data.items;
    }

}