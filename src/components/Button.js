import React from 'react';

const Button = (props) => {
	console.log(props.style);
	return(
	<button
		// style= {props.style}
		className = {props.type==='primary'? 'btn btn-primary' : 'btn btn-secondary'}
		name = {props.name}
		onClick= {props.action} >
		{props.title}
	</button>)
}

export default Button;
