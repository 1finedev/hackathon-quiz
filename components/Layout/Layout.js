import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, className }) => {
	return (
		<>
			<Header className={className} />
			<main>{children} </main>
			<Footer className={className} />
		</>
	);
};

export default Layout;
