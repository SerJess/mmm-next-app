import React from "react";
import dynamic from "next/dynamic";

const NotFound = dynamic(() => import("../components/SingleComponents/NotFound"));

const Page404 = () => <NotFound />;

export default Page404;
