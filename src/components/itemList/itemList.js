import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../spinner';
import gotService from '../../services/gotService';
export default class ItemList extends Component {
	gotService = new gotService();
	state = { charList: null };

	componentDidMount() {
		this.gotService.getAllCharacters().then((charList) => {
			this.setState({ charList });
		});
	}

	renderItems(arr) {
		return arr.map((item) => {
			return (
				<li key={item.id} onClick={() => this.props.onCharSelected(item.id)} className='list-group-item'>
					{item.name}
				</li>
			);
		});
	}

	render() {
		const { charList } = this.state;

		if (!charList) {
			return <Spinner />;
		}
		const items = this.renderItems(charList);

		return <ul className='item-list list-group'>{items}</ul>;
	}
}
