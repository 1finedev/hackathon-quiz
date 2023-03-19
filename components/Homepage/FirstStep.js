import React from "react";

const FirstStep = () => {
    const instructions = [
        {id: 1, instruction: "Read the following instructions like your life depends on it."},
    ];

	return (
		<div className="text-center">
			<div className="">
				<h1 className="text-[2rem] font-medium">Hackathon 4.0</h1>
				<p className="">
					Welcome to the assessment for the hackathon of a lifetime. It&apos;s great that you got this far, your sweat
					will turn to blood, your eyes will see shege but the good thing is that, you won&apos;t die.
				</p>
				<p className="">Before you proceed, read the instructions carefully.</p>
			</div>
			<div className="">Read the following instructions like your life depends on it.</div>
		</div>
	);
};

export default FirstStep;
