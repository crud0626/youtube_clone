import axios from "axios";

const decode = require('unescape');
export default class YoutubeAxios {
    constructor() {
      this.youtube = axios.create({
        // baseURL: "https://crud0626-serverless-youtube.netlify.app/youtube/v3",
        baseURL: "https://eloquent-yalow-62a51f.netlify.app/youtube/v3"
      })
    }

    async getMostPopular(token) {
      const params = {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        maxResults: 24,
        fields : 'items(id,snippet,contentDetails,statistics),nextPageToken',
      }

      if (token) {
        params.pageToken = token;
      }
      
      const response = await this.youtube.get('videos', { params });
      const result = response.data;

      result.items.map(item => {
          item.snippet.title = decode(item.snippet.title, 'all');
          item.snippet.description = decode(item.snippet.description, 'all');

          const keys = Object.keys(item.statistics);
          keys.map(key => item.statistics[key] = +item.statistics[key]);
          return item;
      })
      return result;
    }

    async getSearchVideos(query, token) {
      const params = {
          part: 'snippet',
          maxResults: 24,
          q: query,
          type: 'video',
          fields : 'items(id,snippet),nextPageToken',
      };

      if (token) {
          params.pageToken = token;
      };

      const response = await this.youtube.get('search', {params: params});
      const items = JSON.parse(JSON.stringify(response.data.items));

      items.map(item => {
          item.id = item.id.videoId;
          item.snippet.title = decode(item.snippet.title, 'all');
          item.snippet.description = decode(item.snippet.description, 'all');
          return item;
      })

      const itemsWithInfo = await this.getVideosInfo(items);
      const result = {items: itemsWithInfo, nextPageToken: response.data.nextPageToken};
      
      return result;
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

    async getComment(currentId, token) {
      const params = {
        part: 'snippet',
        maxResults: 20,
        order: 'relevance',
        videoId: currentId,
        fields: 'items,nextPageToken'
      }

      if (token) params.pageToken = token;

      const response = await this.youtube.get('commentThreads', {params: params})
      const result = response.data;
      result.items.map(item => {
        const snippet = item.snippet.topLevelComment.snippet;
        snippet.authorDisplayName = decode(snippet.authorDisplayName, 'all');
        snippet.textDisplay = decode(snippet.textDisplay, 'all');
        return item;
      })
      return result;
    }

    async getChannelInfo(id) {
      const response = await this.youtube.get('channels', {
        params: {
          part: 'snippet,statistics',
          id: id,
          fields: 'items(snippet(thumbnails),statistics(subscriberCount))'
        }
      })
      
      const result = response.data.items[0];
      result.statistics.subscriberCount = +result.statistics.subscriberCount;

      return result;
    }

    async getCurrentVidInfo(video) {
      const channel = await this.getChannelInfo(video.snippet.channelId);
      video.channel = channel;
      const comments = await this.getComment(video.id);

      const result = {
          info: video,
          comments: comments
      };

      return result;
    }
}