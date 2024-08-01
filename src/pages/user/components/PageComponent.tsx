import React from "react";
import PageHeader from "@/Components/Header/Header";

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <PageHeader />
            <div className="min-w-fit max-w-[1280px] w-full mx-auto ">{children}</div>
        </div>
    );
};

export default Container;