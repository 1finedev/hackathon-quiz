import React from "react";

const Button = ({ label, classes, onClick, disabled }) => {
	return (
		<button disabled={disabled} onClick={onClick} className={classes}>
			{label}{" "}
		</button>
	);
};

export default Button;
