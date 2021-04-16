import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

export default class App extends Component {
	state = {
		showRandomCharBlock: true,
	};

	toggleRandomCharBlock = () => {
		this.setState({ showRandomCharBlock: !this.state.showRandomCharBlock });
	};

	render() {
		const randomBlockRender = this.state.showRandomCharBlock ? <RandomChar /> : null;
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
					<Row>
						<Col md='6'>
							<ItemList />
						</Col>
						<Col md='6'>
							<CharDetails />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
