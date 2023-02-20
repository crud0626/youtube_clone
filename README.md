# Youtube-clone

<div align=center><img src="https://user-images.githubusercontent.com/72868495/219651157-ae7e4358-036d-4391-acff-6d57f6ce38a8.png"></div>

<div align=center><a href="https://crud0626-clone-youtube.netlify.app">Youtube-clone Demo Link</a></div>

유튜브 클론 코딩 프로젝트로 CSS의 디테일 및 Youtube API에서 제공하는 데이터를 활용하여 실제 유튜브의 기능을 최대한 구현하는데 비중을 둔 프로젝트입니다.

## 사용 기술

<div align='center'>
  <img src="https://img.shields.io/badge/React-^18.2.0-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Redux-^4.2.0-764ABC?logo=redux" />
  <img src="https://img.shields.io/badge/SCSS-^1.55.0-CC6699?logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=white" />
</div>
<div align='center'>
  <img src="https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white" />
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=white" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white" />
</div>

### 미리보기

| 영역 | 미리보기 |
| --- | :-: |
| - Home 영역 | <img width=800 src="https://user-images.githubusercontent.com/72868495/219651157-ae7e4358-036d-4391-acff-6d57f6ce38a8.png" /> |
| - Watch 영역 | <img width=800 src="https://user-images.githubusercontent.com/72868495/219650733-177d42d6-39fe-4f83-be25-0eb705852210.png" /> |
| - Search 영역 | <img width=800 src="https://user-images.githubusercontent.com/72868495/219651594-49844252-eeb3-4162-a6fe-108838029f27.png" /> |

## 기능

- 비디오 관련

```
조회수, 채널 정보, 제목, 재생시간, 업로드일자 등의 데이터를 Youtube API로부터 응답받아 알맞게 렌더링되도록 구현하였습니다.

또한, 실제 유튜브에서 적용하고 있는 기능인 설명 부분에 가변 토글 기능을 구현 후 적용하였습니다.
```

- 댓글

```
작성일자, 작성자의 썸네일, 댓글 총 개수 등의 정보를 알맞은 영역에 렌더링되도록 구현하였습니다.

비디오 영역과 마찬가지로 가변 토글 기능을 적용하였습니다.
```

- 검색기능

```
React router를 활용하여 query부분에 검색어를 포함하여 라우팅 처리를 할 수 있도록 구현하였습니다.
```

- 로그인 기능

```
Firebase의 Auth를 활용하여 로그인 기능을 구현하였으며 OAuth 2.0 인증을 통해 좋아요 및 싫어요와 같은 인터랙션 기능을 구현하였습니다.
```
