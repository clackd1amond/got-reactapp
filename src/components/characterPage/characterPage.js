import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';
export default class CharacterPage extends Component {
	gotService = new gotService();

	state = {
		selectedChar: 130,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	onCharSelected = (id) => {
		this.setState({ selectedChar: id });
	};

	render() {
		if (this.state.error) return <ErrorMessage />;

		const itemList = (
			<ItemList
				onCharSelected={this.onCharSelected}
				getData={this.gotService.getAllCharacters}
				renderItem={({ name, gender }) => `${name} (${gender.charAt(0)})`}
			/>
		);

		const charDetails = <CharDetails charId={this.state.selectedChar} getData={this.gotService.getCharacter} />;

		return <RowBlock left={itemList} right={charDetails} />;
	}
}
