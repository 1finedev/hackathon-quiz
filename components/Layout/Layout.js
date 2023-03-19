import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, className }) => {
	return (
		<>
			<Header className={className} />
			<main className={`${className} bg-[#121212] text-white`}>{children} </main>
			<Footer className={className} />
		</>
	);
};

export default Layout;
