import axios from "axios";

// InnerHTML로 넣어야 할 듯하다. <b> <br>등이 출력됨.
const decode = require('unescape');

// https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id={비디오아이디들}=items&key={this.key}
// 일단 테스트 결과 성공적이긴 하나 추가적으로 ID들이 정확히 순서대로 맞게 나오는건지 먼저 테스트해봐야하고 그 뒤에 적용예정.
// 각 비디오들의 아이디들은 콤마로구분하며 contentDetails, statistics 부분만 빼서 기존 객체에 붙여넣는 방법으로 할 예정임.

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
        // let IDs = [];
        // response.data.items.forEach(item => {
        //     IDs.push(item.id);
        // })
        // console.log(IDs.join(","));
        // console.log(response.data.items);

        response.data.items.map(item => {
            item.snippet.title = decode(item.snippet.title, 'all');
            item.snippet.description = decode(item.snippet.description, 'all');
            return item;
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
        // id 나눠져있던거 하나로 합침.
        response.data.items.map(item => item.id = item.id.videoId); // 이거 map말고 엘리가 했던것처럼해보기.

        // 테스트 완료, 검색 및 댓글에도 적용해야해서 async로 함수화 시켜야할 것 같다.
        response.data.items.map(item => {
            item.snippet.title = decode(item.snippet.title, 'all');
            item.snippet.description = decode(item.snippet.description, 'all');
            return item;
        })
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

        response.data.items.map(item => {
            item.snippet.topLevelComment.snippet.authorDisplayName = decode(item.snippet.topLevelComment.snippet.authorDisplayName, 'all');
            item.snippet.topLevelComment.snippet.textDisplay = decode(item.snippet.topLevelComment.snippet.textDisplay, 'all');
            return item;
        })

        console.log(response.data.items);
        
        return response.data.items;
    }

}