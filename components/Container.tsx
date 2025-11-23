import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="2xl:max-w-350 xl:max-w-332 mx-auto px-5 xl:px-0">{children}</div>;
};

export default Container;
