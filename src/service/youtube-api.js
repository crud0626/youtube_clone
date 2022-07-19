import axios from 'axios';

const decode = require('unescape');

export default class YoutubeAPI {
    constructor() {
      this.youtube = axios.create({
        // baseURL: "https://crud0626-serverless-youtube.netlify.app/youtube/v3",
        baseURL: process.env.REACT_APP_TEST_URL,
      });
      
      this.contentYoutube = axios.create({
        baseURL: "https://content-youtube.googleapis.com/youtube/v3",
      });
    }

    async getMostPopular(token = null) {
      try {
        const params = {
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          maxResults: 24,
          fields : 'items(id,snippet,contentDetails,statistics),nextPageToken',
        }

        if (token) params.pageToken = token;
        
        const { data } = await this.youtube.get('videos', { params });
        const videosId = [];
        
        data.items.map(item => {
          videosId.push(item.snippet.channelId);
          item.snippet.title = decode(item.snippet.title, 'all');
          item.snippet.description = decode(item.snippet.description, 'all');

          const keys = Object.keys(item.statistics);
          keys.map(key => item.statistics[key] = +item.statistics[key]);
          return item;
        });

        const channelInfos = await this.getChannelInfo(videosId);
        data.items.map((item, index) => item.channel = channelInfos[index]);

        return data;
      } catch (error) {
        alert("비디오를 불러오는 도중 에러가 발생했습니다.");
        throw error;
      }
    }

    async searchVideo(query, token = null) {
      try {
        const params = {
          part: 'snippet',
          maxResults: 24,
          q: query,
          type: 'video',
          fields : 'items(id,snippet),nextPageToken',
        };

        if (token) params.pageToken = token;

        const resData = await this.youtube.get('search', {params: params})
        .then(({ data: { items, nextPageToken } }) => {
          items.map(item => {
            item.id = item.id.videoId;
            item.snippet.title = decode(item.snippet.title, 'all');
            item.snippet.description = decode(item.snippet.description, 'all');
            return item;
          });
          return { items, nextPageToken };
        });

        resData.items = await this.getVideoInfo(resData.items);

        const videosId = resData.items.map(item => item.snippet.channelId);
        const channelInfos = await this.getChannelInfo(videosId);
        resData.items.map((item, index) => item.channel = channelInfos[index]);
        
        return resData;
      } catch ({ response }) {
        if(response.status === 403 && response.data.error.message.match(/exceeded/)) {
          alert("할당량이 초과되어 금일은 이용이 불가합니다.");
          throw new Error(`할당량이 초과 되었습니다.`);
        }
        alert("검색 도중 에러가 발생했습니다.");
        throw new Error(`통신 도중 에러가 발생했습니다. ${response.data.error.message}`);
      }
    }

    async getVideoInfo(items) {
      try {
        const itemsID = items.map(({ id }) => id).join(",");

        const { data } = await this.youtube.get('videos', {
          params: {
            part: 'contentDetails,statistics',
            id: itemsID,
            fields: 'items(contentDetails,statistics)'
          }
        });
  
        items.map((item, index) => (Object.assign(item, data.items[index])));
  
        return items;
      } catch (error) {
        throw error;
      }
    }

    async getComment(currentId, token = null) {
      try {
        const params = {
          part: 'snippet',
          maxResults: 20,
          order: 'relevance',
          videoId: currentId,
          fields: 'items,nextPageToken'
        }
  
        if (token) params.pageToken = token;
  
        const resData = await this.youtube.get('commentThreads', {params: params})
        .then(({data: { items, nextPageToken }}) => {
          items.map(item => {
            const snippet = item.snippet.topLevelComment.snippet;
            snippet.authorDisplayName = decode(snippet.authorDisplayName, 'all');
            snippet.textDisplay = decode(snippet.textDisplay, 'all');
            return item;
          })
          return { items, nextPageToken };
        });

        return resData;
      } catch (error) {
        const reason = error.response.data.error.errors[0].reason;
        if (reason.match("commentsDisabled")) {
          return {items: null, nextPageToken: null};
        } else {
          throw error;
        }
      }
    }

    async getChannelInfo(videosId) {
      try {
        const params = {
          part: 'snippet,statistics',
          id: videosId.join(","),
          fields: 'items(snippet(thumbnails),statistics(subscriberCount))'
        };

        const resData = await this.youtube.get('channels', { params })
        .then(({ data: { items }}) => {
          items.map(item => +item.statistics.subscriberCount);
          return items;
        });

        return resData;
      } catch (error) {
        throw new Error(`에러가 발생했습니다. ${error}`);
      }
    }

    async getCurrentVidInfo(video) {
      try {
        const comments = await this.getComment(video.id);
  
        const result = {
            info: video,
            comments: comments
        };
  
        return result;
      } catch (error) {
        alert("비디오 정보를 불러오는 도중 에러가 발생했습니다.");
        throw new Error(`에러가 발생했습니다. ${error.message}`);
      }
    }

    async ratingVideo(rating, videoId, uid) {
      try {
        const tokens = JSON.parse(localStorage.getItem(uid));
        return await this.contentYoutube.post("videos/rate", "", {
          params: {
            rating: rating,
            id: videoId,
            key: process.env.REACT_APP_YOUTUBE_API_KEY
          },
          headers: {
            "Authorization": `Bearer ${tokens.accessToken}`
          }
        });
      } catch (error) {
        const message = error.response.data.error.message;

        switch(true) {
          case message.includes("Invalid Credentials"):
            alert("토큰이 만료되어 로그인을 재시도합니다.");
            throw message;
          case message.includes("Invalid value"):
            alert("정의되지 않은 평가입니다.");
            throw message;
          default:
            alert("평가 도중 에러가 발생했습니다.");
            throw new Error(`에러가 발생했습니다. ${error.message}`);
        }
      }
    }

    async getRating(videoId, uid) {
      try {
        const tokens = JSON.parse(localStorage.getItem(uid));
        const options = {
          params: {"id": videoId},
          headers: {"Authorization": `Bearer ${tokens.accessToken}`}
        };

        const resData = await this.youtube.get("videos/getRating", options)
        .then(({ data }) => {
          return data.items[0].rating;
        });

        return resData;

        } catch (error) {
        const message = error.response.data.error.errors[0].message;
        if (message === "Invalid Credentials") {
          alert("토큰이 만료되어 로그인을 재시도합니다.");
          throw error;
        }
        
        alert("정보를 가져오는 도중 에러가 발생했습니다.");
        throw new Error(`에러가 발생했습니다. ${error.message}`);
      }
    }
}