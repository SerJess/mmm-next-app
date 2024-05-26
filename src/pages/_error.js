import React from "react";
import dynamic from "next/dynamic";

const NotFound = dynamic(() => import("../components/SingleComponents/NotFound"));

const Error = () => <NotFound />;

export default Error;
