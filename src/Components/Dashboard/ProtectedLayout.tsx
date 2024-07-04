import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
    return (
        <div>
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default ProtectedLayout;
