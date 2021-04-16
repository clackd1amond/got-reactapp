import React, { Component } from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
export default class RandomChar extends Component {
	constructor() {
		super();
		this.updateChar();
	}
	gotService = new gotService();
	state = {
		char: {},
		loading: true,
		error: false,
	};

	onCharLoaded = (char) => {
		this.setState({ char, loading: false });
	};

	onError = (err) => {
		this.setState({ error: true, loading: false });
	};

	updateChar() {
		const id = Math.floor(Math.random() * 140 + 25);
		this.gotService.getCharacter(id).then(this.onCharLoaded).catch(this.onError);
	}

	render() {
		const { char, loading, error } = this.state;
		const content = error ? <ErrorMessage /> : loading ? <Spinner /> : <View char={char} />;

		return <div className='random-block rounded'>{content}</div>;
	}
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
