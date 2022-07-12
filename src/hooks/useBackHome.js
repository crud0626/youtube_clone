import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useBackHome = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!window.location.search === "") {
            navigate("/");
        }
    });
};

export default useBackHome;