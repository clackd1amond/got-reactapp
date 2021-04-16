export default class GotService {
	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';
	}

	async getResource(url) {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, received ${res.status}`);
		}
		return await res.json();
	}

	async getAllCharacters() {
		const res = await this.getResource(`/characters?page=5&pageSize=10`);
		return res.map(this._transformCharacter);
	}

	async getCharacter(id) {
		const character = await this.getResource(`/characters/${id}`);
		return this._transformCharacter(character);
	}

	getAllBooks() {
		return this.getResource(`/books`);
	}

	getBook(id) {
		return this.getResource(`/books/${id}`);
	}

	getAllHouses() {
		return this.getResource(`/houses`);
	}

	getHouse(id) {
		return this.getResource(`/houses/${id}`);
	}

	_extractId = (item) => {
		const idRegExp = /\/([0-9]*)$/;
		return item.url.match(idRegExp)[1];
	};

	_transformCharacter = (char) => {
		return {
			id: this._extractId(char),
			name: char.name !== '' ? char.name : '---',
			gender: char.gender !== '' ? char.gender : '---',
			born: char.born !== '' ? char.born : '---',
			died: char.died !== '' ? char.died : '---',
			culture: char.culture !== '' ? char.culture : '---',
			titles: char.titles[0] !== '' ? char.titles.join('; ') : '---',
			aliases: char.aliases[0] !== '' ? char.aliases.join('; ') : '---',
		};
	};

	_transformHouse = (house) => {
		return {
			id: this._extractId(house),
			name: house.name !== '' ? house.name : '---',
			region: house.region !== '' ? house.region : '---',
			words: house.words !== '' ? house.words : '---',
			titles: house.titles[0] !== '' ? house.titles.join('; ') : '---',
			overlord: house.overlord !== '' ? house.overlord : '---',
			ancestralWeapons: house.ancestralWeapons[0] !== '' ? house.ancestralWeapons.join('; ') : '---',
		};
	};

	_transformBook = (book) => {
		return {
			id: this._extractId(book),
			name: book.name,
			numberOfPages: book.numberOfPages,
			publisher: book.publisher,
			released: book.released,
		};
	};
}
