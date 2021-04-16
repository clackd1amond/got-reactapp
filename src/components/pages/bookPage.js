import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import ItemDetails, { Field } from '../itemDetails';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

class BookPage extends Component {
	gotService = new gotService();

	state = {
		selectedBook: 2,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	onItemSelected = (id) => {
		this.setState({ selectedBook: id });
	};

	render() {
		if (this.state.error) return <ErrorMessage />;

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllBooks}
				renderItem={({ name, numberOfPages }) => (
					<>
						<span className='font-weight-bold'>{name}</span> <span>({numberOfPages} pages)</span>
					</>
				)}
			/>
		);

		const bookDetails = (
			<ItemDetails itemId={this.state.selectedBook} getData={this.gotService.getBook}>
				<Field field='numberOfPages' label='Pages' />
				<Field field='publisher' label='Publisher' />
				<Field field='released' label='Released' />
			</ItemDetails>
		);

		return <RowBlock left={itemList} right={bookDetails} />;
	}
}
export { BookPage };
