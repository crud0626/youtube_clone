# Youtube-clone

Dream Coding by Eliie의 강의를 참고해 만든 개인 클론 프로젝트입니다.
React를 통해 SPA형태로 만들었으며
Netlify를 이용하여 배포하였습니다.
링크

## 기술 스택

<badge> HTML, CSS, JS, REACT, CSS Module,

## 특징

Youtube Data API를 통해 받아온 데이터를 토대로 유튜브와 똑같이 동작한다.
CSS Module을 사용하여 각 컴포넌트별로 독립적인 클래스명을 사용하였다.
클래스형 컴포넌트만을 사용하여 개발하였다.
unescape 라이브러리를 사용하여 데이터의 특수문자를 변환.
미디어 쿼리로 반응형으로 설계하였다.
PureComponent 적용하여 렌더링 최소화.

## 개인적으로 만든 것들.

1. 전체적인 CSS 디테일 (타이틀, 조회수, 댓글, 날짜, 영상 길이 등)
2. 조회수, date, 구독자 등 조금씩 표시하는 방법이 달라서 calcurator js를 만들어 관련된 계산 함수만을 위한 JS 모듈 생성.
3. 선택된 비디오의 desc 및 댓글에 4줄 이상시 toggle 생성.

## 추가할 예정

1. React router 이용해 페이지별 이동이 가능하도록 개선예정.
2. Skeleton UI 적용 예정.
3. Infinite Scrolling 적용 예정.
4. 로그인 기능.
5. Redux 적용 예정.
