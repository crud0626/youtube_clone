import axios from "axios";

const decode = require('unescape');

export default class YoutubeAxios {
    constructor() {
      this.youtube = axios.create({
        // baseURL: "https://crud0626-serverless-youtube.netlify.app/youtube/v3",
        baseURL: process.env.REACT_APP_TEST_URL
      })
      this.contentYoutube = axios.create({
        baseURL: "https://content-youtube.googleapis.com/youtube/v3",
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
      };
      
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

      const response = await this.youtube.get('search', {params: params})
      .then((res) => res)
      .catch(function(error) {
        alert(`검색 도중 에러가 발생했습니다 : ${error.response.data.error.errors[0].reason}`);
      })

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

      return await this.youtube.get('commentThreads', {params: params})
      .then((response) => {
        const result = response.data;
        result.items.map(item => {
          const snippet = item.snippet.topLevelComment.snippet;
          snippet.authorDisplayName = decode(snippet.authorDisplayName, 'all');
          snippet.textDisplay = decode(snippet.textDisplay, 'all');
          return item;
        })
        return result;
      })
      .catch(function(error) {
        const reason = error.response.data.error.errors[0].reason;
        if (reason === "commentsDisabled") {
          return {"items": [null], "nextPageToken": null};
        } else {
          alert(`에러가 발생했습니다 : ${reason}`);
          return {"items": [null], "nextPageToken": null};
        }
      });
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

    async ratingVideo(rating, videoId, token) {
      return await this.contentYoutube.post("videos/rate", "", {
        params: {
          rating: rating,
          id: videoId,
          key: process.env.REACT_APP_YOUTUBE_API_KEY
        },
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(() => true)
      .catch(error => {
        const message = error.response.data.error.errors[0].message;
        if (message === "Invalid Credentials") {
          alert("토큰이 만료되어 로그인을 재시도합니다.");
          return false;
        } else {
          console.log(`에러가 발생했습니다 : ${message}`);
          alert(`에러가 발생했습니다 : ${message}`);
        }
      });
    }
}