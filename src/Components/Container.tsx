import React from "react";
import Header from "./Header/Header";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="min-w-fit max-w-[1280px] w-full mx-auto px-6">
        {children}
      </div>
    </div>
  );
};

export default Container;
