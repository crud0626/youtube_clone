/**
 * useNavigate훅이 V6부터 URL 변경시마다 재 생성되어 리렌더링을 유발하기 때문에 커스텀 훅을 만들어 적용
 * ref객체는 리렌더링을 유발하지 않으므로 navigate 함수를 ref 객체에 넣어 Context API를 이용해 제공
 * 
 * 출처: https://codesandbox.io/s/usenavigate-waste-renders-ujor17
 */

import { createContext, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

const StableNavigateContext = createContext(null);

const StableNavigateContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const navigateRef = useRef(navigate);

    return (
        <StableNavigateContext.Provider value={navigateRef}>
            {children}
        </StableNavigateContext.Provider>
    );
};

// 컴포넌트 내부에서 사용되는 함수
const useStableNavigate = () => {
  const navigateRef = useContext(StableNavigateContext);
  if (navigateRef?.current === null) {
    throw new Error("StableNavigate context is not initialized");
  }

  return navigateRef?.current;
};

export {
  StableNavigateContext,
  StableNavigateContextProvider,
  useStableNavigate
};
