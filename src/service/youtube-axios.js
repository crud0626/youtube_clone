import axios from "axios";

const decode = require('unescape');
export default class YoutubeAxios {
    constructor() {
        this.youtube = axios.create({
            baseURL: "https://crud0626-serverless-youtube.netlify.app/youtube/v3",
        })
    }

    async getMostPopular() {
        const response = await this.youtube.get('videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                maxResults: 24,
                fields : 'items(id,snippet,contentDetails,statistics)',
            }
        })

        const items = response.data.items.map(item => {
            item.snippet.title = decode(item.snippet.title, 'all');
            item.snippet.description = decode(item.snippet.description, 'all');
            return item;
        })

        return items;
    }

    async getSearchVideos(query) {
        const response = await this.youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 24,
                q: query,
                type: 'video',
                fields : 'items(id,snippet)',
            }
        })
        
        const items = JSON.parse(JSON.stringify(response.data.items));

        items.map(item => {
            item.id = item.id.videoId;
            item.snippet.title = decode(item.snippet.title, 'all');
            item.snippet.description = decode(item.snippet.description, 'all');
            return item;
        })

        const itemsWithInfo = await this.getVideosInfo(items);
        
        return itemsWithInfo;
    }

    async getVideosInfo(items) {
        const IDs = [];
        items.forEach(item => {
            IDs.push(item.id);
        })

        const Infos = await this.youtube.get('videos', {
            params: {
                part: 'contentDetails,statistics',
                id: IDs.join(','),
                fields: 'items(contentDetails,statistics)'
            }
        });

        for(let i = 0; i < items.length; i++) {
            Object.assign(items[i], Infos.data.items[i]);
        }

        return items;
    }

    async getComment(currentId) {
        const response = await this.youtube.get('commentThreads', {
            params: {
                part: 'snippet',
                maxResults: 20,
                order: 'relevance',
                videoId: currentId,
                fields: 'items'
            }
        })

        const items = response.data.items.map(item => {
            const snippet = item.snippet.topLevelComment.snippet;
            snippet.authorDisplayName = decode(snippet.authorDisplayName, 'all');
            snippet.textDisplay = decode(snippet.textDisplay, 'all');
            return item;
        })
        
        return items;
    }

    async getChannelInfo(id) {
        const response = await this.youtube.get('channels', {
            params: {
                part: 'snippet,statistics',
                id: id,
                fields: 'items(snippet(thumbnails),statistics(subscriberCount))'
            }
        })
        return response.data.items[0];
    }

    async getCurrentVidInfo(video) {
        const channel = await this.getChannelInfo(video.snippet.channelId);
        const comments = await this.getComment(video.id);
        const result = {...video, comments, channel};
        return result;
    }
}