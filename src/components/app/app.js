import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharacterPage, BookPage, HousePage, BooksItem } from '../pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
			<Router>
				<div className='app'>
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

						<Route path='/characters' component={CharacterPage} />
						<Route path='/houses' component={HousePage} />
						<Route exact path='/books' component={BookPage} />
						<Route
							path='/books/:id'
							render={({ match }) => {
								const { id } = match.params;
								return <BooksItem bookId={id} />;
							}}
						/>
					</Container>
				</div>
			</Router>
		);
	}
}
