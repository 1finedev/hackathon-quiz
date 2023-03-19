import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, className }) => {
	return (
		<>
			<Header className={className} />
			<main className={`${className} bg-[#1E1E1E] text-white`}>{children} </main>
			<Footer className={className} />
		</>
	);
};

export default Layout;
