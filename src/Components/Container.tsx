import React from "react";
import Header from "./Header/Header";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="min-w-fit w-full  px-8">
        {children}
      </div>
    </div>
  );
};

export default Container;
