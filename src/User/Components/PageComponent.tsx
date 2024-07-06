import React from "react";
import PageHeader from "../Pages/Header/PageHeader";

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <PageHeader />
            <div className="min-w-fit max-w-[1280px] w-full mx-auto px-6">{children}</div>
        </div>
    );
};

export default Container;