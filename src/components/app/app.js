import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharacterPage, BookPage, HousePage } from '../pages';

export default class App extends Component {
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

					<BookPage />

					<HousePage />
				</Container>
			</>
		);
	}
}
