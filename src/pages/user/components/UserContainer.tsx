import React from "react";
import PageComponent from "@/pages/user/components/PageComponent";
import Footer from "./Footer";

const UserContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <PageComponent>
                <div className="   w-full ">{children}</div>
                <Footer />
            </PageComponent>

        </div>
    );
};

export default UserContainer;