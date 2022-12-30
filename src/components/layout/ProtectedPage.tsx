import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import Unauthorized from "./Unauthorized";

const ProtectedPage: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Unauthorized />;
  }
};

export default ProtectedPage;
