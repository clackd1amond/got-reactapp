import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import ItemDetails, { Field } from '../itemDetails';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

class CharacterPage extends Component {
	gotService = new gotService();

	state = {
		selectedChar: 130,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	onItemSelected = (id) => {
		this.setState({ selectedChar: id });
	};

	render() {
		if (this.state.error) return <ErrorMessage />;

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllCharacters}
				renderItem={({ name, gender }) => (
					<>
						<span className='font-weight-bold'>{name}</span> <span>({gender.charAt(0)})</span>
					</>
				)}
			/>
		);

		const charDetails = (
			<ItemDetails itemId={this.state.selectedChar} getData={this.gotService.getCharacter}>
				<Field field='gender' label='Gender' />
				<Field field='born' label='Born' />
				<Field field='died' label='Died' />
				<Field field='culture' label='Culture' />
			</ItemDetails>
		);

		return <RowBlock left={itemList} right={charDetails} />;
	}
}
export { CharacterPage };
