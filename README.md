# Youtube-clone

[![Netlify Status](https://api.netlify.com/api/v1/badges/21afc7b3-a602-4d2c-ab3f-d0f60bb5d11c/deploy-status)](https://crud0626-clone-youtube.netlify.app/)

## 프로젝트 설명

유튜브 클론 코딩 프로젝트로 CSS의 디테일 및 Youtube data API로 구현가능한 기능을 최대한 개발하는데 비중을 둔 프로젝트입니다.

<div align=center><img src="https://user-images.githubusercontent.com/72868495/180460395-fd189414-31e1-401a-a933-feb1e76d05c8.png"></div>
<br>
<div align=center><a href="https://crud0626-clone-youtube.netlify.app">Youtube-clone Demo Link</a></div>

## 기술 스택

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src ="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white"/></br>
<img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />
<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" />

## 기능

- 비디오 관련<br>
  조회수, 해당 채널관련 정보, 제목, 재생시간, 업로드일자, 비디오 설명의 가변 토글

- 댓글<br>
  작성일자, 작성자 링크, 썸네일, 댓글 총 개수, 플립, 토글 적용

- 검색기능

- 로그인 기능<br>
  OAuth2 인증을 통해 좋아요 및 싫어요 반응 구현

## 특징

- **모바일 환경을 위한 레이아웃 재배치**
<div align=center>
  <img width=700 src="https://user-images.githubusercontent.com/72868495/180468090-bbb7a521-8d5e-440f-b5df-2f30ea45e549.png"/>
</div>

비디오가 선택되어 있는 Watch 페이지의 경우 오른쪽에 위치한 플레이리스트를 비디오와 댓글 사이의 위치로 변경하는 **레이아웃 재배치 과정이 필요**했습니다.<br>
<br>
이를 위해 **ResizeObserver를 사용한 커스텀 훅을 생성하여 뷰포트 변화를 감지**하도록 하였고 이는 **인자로 받은 특정 픽셀을 기준으로 boolean값을 반환하도록 구현**하였습니다.<br>
<br>
또한 **resize 이벤트 특성상 이벤트가 자주 발생하여 state 변경이 잦고 불필요한 리렌더링을 유발할 수 있어 성능에 좋지 않은 영향을 끼치기 때문에 옵저버의 콜백 함수 내부에 debounce를 적용하여 이벤트를 최소화**하였습니다.

---

- **PostCSS -> SCSS로 마이그레이션 진행**

PostCSS는 CRA설치 시 기본으로 포함되어 있으며 플러그인 형태로 필요한 기능만 추가하여 사용할 수 있어 라이브러리의 크기를 최소화할 수 있다는 장점때문에 개발 초기부터 적용해왔습니다.<br>
<br>
하지만 **CRA에 기본으로 포함되지 않는 플러그인들의 경우 CRA와의 버전 충돌이 잦아 eject를 통해 설정을 바꿔야 했고 이로 인한 사이드 이펙트를 피하기 위해 CRACO 라이브러리를 이용**했었습니다.<br>
<br>
하지만 그럼에도 불구하고 **CRA 업데이트 과정에서 종종 충돌이 일어났고 기존에 사용하던 기능들이 특별히 PostCSS에서만 사용가능한 기능은 아니었기 때문에 안정성을 위해 SCSS로 마이그레이션을 진행**하였습니다.

---

- **API 통신 시 key가 노출되는 문제 해결**

Youtube API 특성 상 요청 시 요청 URL에 API key가 노출되는 문제가 있었습니다.<br>
<br>
어떤식으로 접근해야 API key노출을 막을 수 있는지 찾아보다가 클라이언트 측에서는 redirect server를 이용하는 방법이 있다는것을 알게 되었습니다.<br>
<br>
**Netlify의 serverless functions를 바탕으로 한 오픈소스를 fork후 배포해 redirect server를 거칠 때 API key가 추가되도록 하여 노출을 막았습니다.**

<div align=center>
    <img width=700 src="https://user-images.githubusercontent.com/72868495/180468780-c4acc4c9-9696-455e-aa1e-29149d669312.png"/>
</div>

---

- **OAuth 2.0 인증을 통해 유저의 개인 데이터 조회 및 POST 통신이 가능하도록 구현**

로그인을 구현하고나서 유저의 개인 데이터 조회와 좋아요, 싫어요, 구독, 댓글 작성 등의 기능을 지원하기 위해선 OAuth 2.0인증이 필요했습니다.<br>
제가 찾아본 구글의 OAuth2.0 인증을 하는 방법은 아래와 같이 총 3가지였습니다.

> 1. Google에서 제공하는 gapi
> 2. Firebase의 auth
> 3. react-google-login 라이브러리

3가지 방법을 모두 테스트해보았는데 그 중에서 2번 Firebase의 auth를 선택하게 되었습니다.<br>
<br>
**1번의 경우 스크립트 전역에 gapi라는 변수 이름으로 유저의 정보가 노출되는 문제가 있어 보안에 문제가 있을 수 있다고 생각하여 배제**하였고<br>
3번의 경우 구현 후 테스트 과정에서 **OAuth2.0인증시 refresh Token을 지원하지 않아 요청하더라도 응답에서 제외되는것을 발견**하게 되어 Firebase를 사용하게 되었습니다.<br>
<br>
다만, **refresh Token을 발급 받으려면 인증과정에서 client-secret도 전송해야하는데 이는 클라이언트단에서 전송하면 노출**되는것을 확인하여 추후 **NodeJS를 배우면서 redirect server를 수정하여 노출되지 않도록 조치 할 예정**입니다.<br>
그래서 현재는 \*\*refresh Token을 발급받지 않고 사용자의 expires가 만료되면 재로그인을 하는 방식으로 로직을 작성\*\*하였습니다.

---

- **skeleton UI 및 로딩 스피너 적용**

  기존 유튜브와 같이 메인페이지에 한해서만 skeleton UI를 적용하였습니다.<br>
  또한 watch 및 result페이지에서는 비디오와 댓글에 로딩스피너를 적용하였습니다.

- **Infinite Scrolling 적용**

  댓글과 비디오 영역에 적용하였으며 이벤트를 최소화하기 위해 Intersection Observer API를 활용하여 구현하였습니다.

- **React router를 이용해 라우팅 적용**

  home, watch, result 3개 페이지로 분기하였으며<br>
  URL의 쿼리값으로 watch 페이지에서는 videoID, result에서는 검색어가 쿼리값이 되도록 구현하였습니다.

- **댓글 key 중복 문제 해결**

  Youtube API로 데이터를 받을 때 비디오와 댓글의 경우 고유의 ID도 같이 전달받습니다.<br>
  그래서 해당 요소의 ID를 key로 사용했었는데 간헐적으로 key가 중복된다는 에러가 발생하였고<br>
  이유를 찾기 위해 API의 데이터와 youtube에서의 데이터를 비교해보았습니다.<br>
  원인은 수정된 댓글의 경우 API에 늦게 반영되어 key가 중복되는 현상이 발견되었고<br>
  이를 해결하기 위해 가벼우면서 UUID보다 2배 가량 빠른 nanoID라이브러리를 적용하여 key 중복 문제를 해결하였습니다.

- **데이터별, 위치별로 다른 형식을 디스플레이 하기 위한 함수 생성**

  조회수, 날짜, 구독자 등의 데이터들이 데이터별, 페이지별로 표시되는 방식이 매우 다양하여<br>
  이를 변환하기 위한 공통 함수를 생성하였으며 같은 데이터를 사용하면서 디스플레이되는 위치에 따라 알맞은 형식으로 표시되도록 구현하였습니다.
