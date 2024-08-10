import React from "react";
import Header from "../Header/Header";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className=" w-full">
        {children}
      </div>
    </div>
  );
};

export default Container;
