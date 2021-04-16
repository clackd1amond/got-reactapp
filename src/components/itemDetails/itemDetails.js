import React, { Component } from 'react';
import './itemDetails.css';
import gotService from '../../services/gotService';

export default class ItemDetails extends Component {
	gotService = new gotService();

	state = {
		item: null,
	};

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.updateItem();
		}
	}

	updateItem() {
		const { itemId, getData } = this.props;
		if (!itemId) return;

		getData(itemId).then((item) => {
			this.setState({ item });
		});
	}

	render() {
		if (!this.state.item) {
			return <span className='select-error'>Please select an item from the list!</span>;
		}
	}
}
