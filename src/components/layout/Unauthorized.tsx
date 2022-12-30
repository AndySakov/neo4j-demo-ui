import Error from "next/error";
import React from "react";

const Unauthorized: React.FC = () => {
  return <Error statusCode={401} title="Please sign in to access this page" />;
};

export default Unauthorized;
