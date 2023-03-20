import React from "react";
import Link from "next/link";

const Footer = ({ className }) => {
	return (
		<footer className={`${className} bg-secondary-mid font-semibold`}>
			<div className="container mx-auto py-4 px-5 grid grid-cols-1 ">
				<p className="text-lg text-white mb-3 self-center justify-self-center sm:self-start sm:justify-self-center">
					React Quizzer
				</p>
				<p className="text-lg text-white  self-center justify-self-center sm:self-end sm:justify-self-center">
					&copy; 2023 All Rights Reserved
				</p>
			</div>
		</footer>
	);
};

export default Footer;
