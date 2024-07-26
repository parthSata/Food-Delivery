import React from "react";
import PageComponent from "@/pages/user/components/PageComponent";

const UserContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <PageComponent>
                <div className="min-w-fit max-w-[1280px] w-full mx-auto px-6">{children}</div>
            </PageComponent>
        </div>
    );
};

export default UserContainer;