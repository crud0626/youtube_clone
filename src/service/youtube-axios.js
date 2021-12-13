import axios from "axios";

// InnerHTML로 넣어야 할 듯하다. <b> <br>등이 출력됨.
const decode = require('unescape');
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

        const items = response.data.items;

        // 변환.
        // 얘 함수로 빼고 싶은데 배열로 받음. 그래서 function (count, ...args)로 해서 배열로 어떻게 가능하지않을까?

        items.map(item => {
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
                maxResults: 25,
                q: query,
                type: 'video',
                fields : 'items(id,snippet)',
            }
        })
        const items = JSON.parse(JSON.stringify(response.data.items));

        items.map(item => (
            item.id = item.id.videoId
        ));

        //검색 및 댓글에도 적용해야해서 async로 함수화 시켜야할 것 같다.
        items.map(item => {
            item.snippet.title = decode(item.snippet.title, 'all');
            item.snippet.description = decode(item.snippet.description, 'all');
            return item;
        })
        
        // ID가져오기.
        const IDs = [];
        items.forEach(item => {
            IDs.push(item.id);
        })

        const otherInfos = await this.youtube.get('videos', {
            params: {
                part: 'contentDetails,statistics',
                id: IDs.join(','),
                fields: 'items(contentDetails,statistics)'
            }
        });
        
        // for문이 아닌 assign메소드로만 사용 가능한지 확인해보기.
        for(let i = 0; i < items.length; i++) {
            Object.assign(items[i], otherInfos.data.items[i]);
        }

        return items;
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

        // refactoring 예정.
        console.log(response.data.items);

        response.data.items.map(item => {
            item.snippet.topLevelComment.snippet.authorDisplayName = decode(item.snippet.topLevelComment.snippet.authorDisplayName, 'all');
            item.snippet.topLevelComment.snippet.textDisplay = decode(item.snippet.topLevelComment.snippet.textDisplay, 'all');
            return item;
        })
        
        return response.data.items;
    }

}