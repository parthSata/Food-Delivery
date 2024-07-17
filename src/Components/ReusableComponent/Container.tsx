import React from "react";
import DashboardHeader from "../Dashboard/Menu";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardHeader />
      <div className="min-w-fit max-w-[1280px] w-full mx-auto px-6">{children}</div>
    </div>
  );
};

export default Container;
