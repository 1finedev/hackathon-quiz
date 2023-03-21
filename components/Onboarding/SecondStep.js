import React from "react";

const SecondStep = () => {
	const questions = [
		{ id: 1, question: "What is the full meaning of CSS?", options: ["Cascading Style Sheets", "Cascading Sheets Style", "Code Something Smooth", "Code Style Sheets"], answer: "Cascading Style Sheets" },
		{ id: 2, question: "What is the full meaning of HTML?", options: ["HyperText Markup Language", "Hype Text Mouth Language", "Hyper Test Makeup Langauge", "Hype Typescript Miss Langauge"], answer: "HyperText Markup Language" },
		{ id: 3, question: "What is a Javascrpit framework?", options: ["React Js", "C#", "Flutter", "C++"], answer: "React Js" },
	];

	return (
		<div className="w-[90%] mx-auto">
			<div className="text-center">
				<h1 className="text-[2rem] font-semibold">Hackathon 3.0 🔥</h1>
				<p className="font-medium">
					You are now entering the second step of the assessment. This step consists of multiple-choice questions.
				</p>
			</div>
			<div className="mt-5 space-y-4">
				<h2 className="font-semibold">Instructions:</h2>
				<ul className="list-disc list-inside font-medium">
					<li>Answer all questions to the best of your ability.</li>
					<li>You have 10 minutes to complete this step.</li>
					<li>Once you submit your answers, you will not be able to go back to change them.</li>
				</ul>
				<h2 className="font-semibold">Questions:</h2>
				{questions.map(({ question, options, id }) => (
					<div key={id} className="my-4">
						<p className="font-medium">{question}</p>
						<ul className="list-disc list-inside">
							{options.map((option, index) => (
								<li key={index}>{option}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default SecondStep;
