import React from "react";

const FirstStep = () => {
	const instructions = [
		{ id: 1, instruction: "Refresh the page and get 0 marks" },
		{ id: 2, instruction: "Question cannot be flagged " },
		{ id: 3, instruction: "Switch tabs or maybe use a chrome extension and you fail" },
	];

	return (
		<div className="w-[90%] mx-auto">
			<div className="text-center">
				<h1 className="text-[2rem] font-semibold">Hackathon 3.0 🔥</h1>
				<p className="font-medium">
					Welcome to the assessment for the hackathon of a lifetime. It&apos;s great that you got this far, your sweat
					will turn to blood, your eyes will see shege but the good thing is that, you won&apos;t die.
				</p>
			</div>
			<div className="mt-5 space-y-4">
				<h2 className="font-semibold">Read the following instructions before you proceed</h2>
				<ul className="list-decimal list-inside font-medium">
					{instructions.map(({ instruction, id }) => (
						<li key={id} className="">
							{instruction}
						</li>
					))}
				</ul>
				
			</div>
		</div>
	);
};

export default FirstStep;
