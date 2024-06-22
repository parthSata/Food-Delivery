import React from "react";
import UserHeader from "../Home/UserHeader";

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <UserHeader />
            <div className="min-w-fit max-w-[1280px] w-full mx-auto px-6">{children}</div>
        </div>
    );
};

export default Container;