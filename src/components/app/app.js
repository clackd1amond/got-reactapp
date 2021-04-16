import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import './app.css';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharacterPage, BookPage, HousePage, BooksItem } from '../pages';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

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
						<Switch>
							<Route
								path='/'
								exact
								render={() => {
									return (
										<Row>
											<Col lg={{ size: 5, offset: 0 }}>
												<button className='btn btn-primary mb-4' onClick={this.toggleRandomCharBlock}>
													Hide/show random block
												</button>
												{randomBlockRender}
											</Col>
										</Row>
									);
								}}
							/>
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
							<Route
								render={() => {
									return (
										<>
											<h3 className='text-light'>Такой страницы не существует</h3>
											<Link to='/' className='btn btn-primary btn-lg btn-block text-light'>
												Вернуться на главную
											</Link>
										</>
									);
								}}
							/>
						</Switch>
					</Container>
				</div>
			</Router>
		);
	}
}
