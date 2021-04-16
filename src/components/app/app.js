import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';

export default class App extends Component {
	gotService = new gotService();

	state = {
		showRandomCharBlock: true,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	toggleRandomCharBlock = () => {
		this.setState({ showRandomCharBlock: !this.state.showRandomCharBlock });
	};

	render() {
		const randomBlockRender = this.state.showRandomCharBlock ? <RandomChar /> : null;

		if (this.state.error) return <ErrorMessage />;

		return (
			<>
				<Container>
					<Header />
				</Container>
				<Container>
					<Row>
						<Col lg={{ size: 5, offset: 0 }}>
							<button className='btn btn-primary mb-4' onClick={this.toggleRandomCharBlock}>
								Hide/show random block
							</button>
							{randomBlockRender}
						</Col>
					</Row>

					<CharacterPage />

					<Row>
						<Col md='6'>
							<ItemList
								onCharSelected={this.onCharSelected}
								getData={this.gotService.getAllBooks}
								renderItem={({ name, numberOfPages }) => (
									<>
										<span className='font-weight-bold'>{name}</span> <span>({numberOfPages} pages)</span>
									</>
								)}
							/>
						</Col>
						<Col md='6'>
							<CharDetails charId={this.state.selectedChar} getData={this.gotService.getBook} />
						</Col>
					</Row>

					<Row>
						<Col md='6'>
							<ItemList
								onCharSelected={this.onCharSelected}
								getData={this.gotService.getAllHouses}
								renderItem={({ name, region }) => `${name} (${region})`}
							/>
						</Col>
						<Col md='6'>
							<CharDetails charId={this.state.selectedChar} getData={this.gotService.getHouse} />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
