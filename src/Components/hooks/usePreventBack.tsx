import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const usePreventBack = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handlePopState = (event: any) => {
            event.preventDefault();
            if (window.confirm('Are you sure you want to go back? You will be logged out.')) {
                // Perform logout here if needed
                navigate('/'); // Redirect to home page or login page after logout
            } else {
                window.history.pushState(null, location.pathname);
            }
        };

        window.history.pushState(null, window.location.pathname);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate, location]);
};

export default usePreventBack;
