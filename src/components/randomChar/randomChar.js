import React, { useState, useEffect } from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

function RandomChar({ interval = 5000 }) {
	const gotService = new GotService();

	const [char, updateCharState] = useState({});
	const [loading, onCharLoadedState] = useState(true);
	const [error, onErrorState] = useState(false);

	useEffect(() => {
		updateChar();
		const timerId = setInterval(updateChar, interval);
		return () => {
			clearInterval(timerId);
		};
	}, []);

	const updateChar = () => {
		const id = Math.floor(Math.random() * 140 + 25);
		gotService
			.getCharacter(id)
			.then((data) => {
				updateCharState(data);
				onCharLoadedState(false);
			})
			.catch(() => {
				onErrorState(true);
				onCharLoadedState(false);
			});
	};

	const content = error ? <ErrorMessage /> : loading ? <Spinner /> : <View char={char} />;

	return <div className='random-block rounded'>{content}</div>;
}

const View = ({ char: { name, gender, born, died, culture } }) => {
	return (
		<>
			<h4>Random Character: {name}</h4>
			<ul className='list-group list-group-flush'>
				<li className='list-group-item d-flex justify-content-between'>
					<span className='term'>Gender </span>
					<span>{gender}</span>
				</li>
				<li className='list-group-item d-flex justify-content-between'>
					<span className='term'>Born </span>
					<span>{born}</span>
				</li>
				<li className='list-group-item d-flex justify-content-between'>
					<span className='term'>Died </span>
					<span>{died}</span>
				</li>
				<li className='list-group-item d-flex justify-content-between'>
					<span className='term'>Culture </span>
					<span>{culture}</span>
				</li>
			</ul>
		</>
	);
};

export default RandomChar;
