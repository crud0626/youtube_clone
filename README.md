# Youtube-clone

Dream Coding by Ellie의 강의를 참고해 만든 개인 클론 프로젝트입니다.</br>
React를 사용하여 SPA형태로 제작했으며 Netlify를 이용하여 배포하였습니다.</br>

Demo Link : [![Netlify Status](https://api.netlify.com/api/v1/badges/21afc7b3-a602-4d2c-ab3f-d0f60bb5d11c/deploy-status)](https://crud0626-clone-youtube.netlify.app/)

## 기술 스택

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src ="https://img.shields.io/badge/PostCSS-DD3A0A.svg?&style=for-the-badge&logo=PostCSS&logoColor=#DD3A0A"/></br>
<img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />
<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" />

## 특징

- Axios 라이브러리를 적용하여 Youtube Data API의 데이터 사용
- CSS Module을 사용하여 각 컴포넌트별 독립적인 클래스명 사용
- PostCSS의 nesting 적용
- unescape-js 라이브러리를 사용하여 댓글, 영상 설명에 관련된 데이터들의 디코딩 이슈 해결
- 미디어 쿼리를 적용하여 반응형 웹사이트로 제작
- PureComponent 적용하여 각 컴포넌트별 리렌더링을 최소화
- Netlify의 serverless functions를 이용한 redirect server를 통해 API와 통신하여 요청시 API key가 노출되는 문제 해결
- Netlify를 통해 배포 자동화.

## 구현한 유튜브 기능

- 비디오 관련
  <br>조회수, 해당 채널관련 정보, 제목, 재생시간, 업로드일자, 채널의 설명 토글

- 댓글
  <br>작성일자, 작성자 링크, 썸네일, 댓글 총 개수, 플립, 일정 줄 이상의 댓글에만 토글 적용

- 검색기능

- 로그인 기능
  <br>OAuth2 인증을 통해 좋아요 및 싫어요 반응 구현

## 개인적으로 수정 및 추가한 사항

1. 전체적인 CSS 디테일 (타이틀, 조회수, 댓글, 날짜, 영상 길이 등)
2. 조회수, date, 구독자등의 데이터들이 데이터별, 페이지별로 표시되는 방식이 달라서 표시되는 위치에 맞는 형식으로 데이터를 보여주기 위해 string을 변환하는 과정이 필요하였고 이를 위한 별도의 모듈 파일을 만들어 적용
3. 영상이 선택되었을 때 영상의 설명 및 댓글이 정해진 일정 줄을 넘기게 되면 toggle이 생성되어 사용자의 선택에 따라 해당 부분을 접고 펼 수 있음. (영상 설명의 경우 기존 유튜브에서는 적용되어있지 않으나 일관성있는게 좋다고 판단되어 영상 설명에도 적용)
4. dotenv를 이용해 API key를 숨기고자 하였으나 Youtube DATA API의 특성상 요청 헤더에 노출되는것을 발견하였고</br> 현재 프로젝트가 CSR형태이기 때문에 Netlify의 serverless functions를 이용해 만들어진 오픈소스를 활용하여</br> redirect server를 통해 API key 노출 문제를 해결하였다.
5. 댓글과 비디오에 대해 Intersection Observer API를 활용하여 Infinite Scrolling 적용
6. Firebase auth를 이용하여 구글 소셜 로그인 기능 적용
7. React router를 적용하여 검색시 또는 비디오 클릭시에 라우팅되며 query 값으로 검색어, 비디오의 ID가 URI에 함께 노출되도록 구현하였다.
8. OAuth2 인증을 통해 좋아요 및 싫어요 동작 구현
9. 메인 페이지에 스켈레톤 UI적용

## 수정 예정

- [ ] 가상키보드 적용
- [ ] nav 추가
- [ ] Redux 적용
