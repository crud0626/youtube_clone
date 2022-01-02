# Youtube-clone

Dream Coding by Eliie의 강의를 참고해 만든 개인 클론 프로젝트입니다.</br>
React를 사용하여 SPA로 만들었으며 Netlify를 이용하여 배포하였습니다.</br>
[Demo Link]()

## 기술 스택

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></br>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />
<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" />

## 특징

- Youtube Data API를 통해 가져온 데이터를 사용</br>
- CSS Module을 사용하여 각 컴포넌트별 독립적인 클래스명 사용</br>
- 클래스형 컴포넌트만을 사용하여 개발</br>
- unescape-js 라이브러리를 사용하여 댓글, 영상 설명에 관련된 데이터들의 디코딩 이슈 해결</br>
- 미디어 쿼리를 이용하여 반응형 웹사이트로 제작</br>
- PureComponent를 모두 적용하여 각 컴포넌트별 리렌더링을 최소화</br>

## 개인적으로 수정 및 추가한 사항

1. 전체적인 CSS 디테일 (타이틀, 조회수, 댓글, 날짜, 영상 길이 등)
2. 조회수, date, 구독자등의 데이터들이 데이터별, 페이지별로 표시되는 방식이 달라서 상황에 알맞는 데이터를 보여주기 위해 string을 변환하는 과정이 필요하였고</br> 이를 위한 별도의 모듈 파일을 만들어 적용

3. 영상이 선택되었을 때 영상의 설명 및 댓글이 정해진 일정 줄을 넘기게 되면 toggle이 생성되어 사용자의 선택에 따라 해당 부분을 접고 펼 수 있음.

## 수정 예정

- [ ] JS-XSS 라이브러리 적용 (불가피하게 HTML을 직접 삽입하는 방식에 의한 보안 이슈 방지 차원)
- [ ] 가상키보드 적용
- [ ] React router 적용
- [ ] nav 컴포넌트 생성
- [ ] 스켈레톤 UI 적용
- [ ] postCSS의 플러그인들을 활용하여 CSS 전체적으로 리팩토링.
- [ ] 댓글 및 플레이리스트에 대해 infinite scrolling 적용
- [ ] 로그인 기능
- [ ] Redux 적용
