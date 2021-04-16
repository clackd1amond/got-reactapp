import React from 'react';
import img from './error.jpg';

const ErrorMessage = () => {
	return (
		<>
			<img src={img} className='img-fluid' alt='error' />
			<span>Something went wrong</span>
		</>
	);
};

export default ErrorMessage;
