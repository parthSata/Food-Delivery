import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const usePreventBack = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handlePopState = (event: any) => {
            event.preventDefault();
            window.history.pushState(null, location.pathname);

        };

        window.history.pushState(null, window.location.pathname);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate, location]);
};

export default usePreventBack;
