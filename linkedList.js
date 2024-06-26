export class LinkedList {
	#head;

	constructor() {
	}

	get head() {
		return this.#head;
	}

	get tail() {
		if (this.#head === undefined)
			return undefined;

		let tailNode = this.#head;

		while(tailNode.next !== undefined)
			tailNode = tailNode.next;

		return tailNode;
	}

	get size() {
		let size = 0;
		let currentNode = this.#head;

		for (size; currentNode !== undefined; size++)
			currentNode = currentNode.next;

		return size;
	}

	append(data) {
		const node = new Node(data);
		
		if (this.#head === undefined)
			return this.#head = node;

		let currentNode = this.#head;

		while (currentNode.next !== undefined) {
			currentNode = currentNode.next;
		}

		return currentNode.next = node;
	}

	prepend(data) {
		const node = new Node(data);

		if (this.#head === null)
			return this.#head = node;

		node.next = this.#head;

		return this.#head = node;
	}

	at(index) {
		if (this.#head === undefined)
			throw new Error('Index out of bounds');
	
		let currentNode = this.#head;

		for (let i = 0; i < index; i++) {
			currentNode = currentNode.next;

			if (currentNode === undefined)
				throw new Error('Index out of bounds');
		}

		return currentNode;
	}

	pop() {
		if (this.#head === undefined)
			return undefined;

		if (this.#head.next === undefined) {
			let currentNode = this.#head;
			this.#head = undefined;

			return currentNode;
		}

		let previousNode = this.#head;
		let currentNode = this.#head.next;	

		while (currentNode.next !== undefined) {
			previousNode = currentNode;
			currentNode = currentNode.next;
		}

		previousNode.next = undefined;

		return currentNode;
	}

	contains(data) {
		if (this.#head === undefined)
			return false;
		
		let currentNode = this.#head;

		for (currentNode; currentNode !== undefined; currentNode = currentNode.next)
			if (JSON.stringify(currentNode.data) === JSON.stringify(data)) return true;

		return false;
	}

	find(data) {
		if (this.#head === null)
			return null;

		let currentNode = this.#head;
		let index = 0;

		for (currentNode; currentNode !== undefined; currentNode = currentNode.next) {
			if (JSON.stringify(currentNode.data) === JSON.stringify(data))
				return index;

			index++;
		}

		return null;
	}

	toString() {
		if (this.#head === null)
			return '';

		let currentNode = this.#head;
		let listAsString = '';

		for (currentNode; currentNode != undefined; currentNode = currentNode.next) {
			if (currentNode === this.#head)
				listAsString = `( ${this.#head.data} )`;
			else
				listAsString = `${listAsString} => ( ${currentNode.data} )`;
		}

		return listAsString = `${listAsString} => null`;
	}

	insertAt(data, index) {
		if (this.#head === undefined && index !== 0)
			throw new Error('Index out of bounds');

		if (index < 0)
			throw new Error('Index must be greater than or equal to zero');

		const node = new Node(data);

		if (index === 0) {
			node.next = this.#head;
			return this.#head = node;
		}

		let currentNode = this.#head;
		let previousNode = undefined;

		for (let i = 0; i <= index; i++) {
			if (i === index) {
				node.next = currentNode;
				return previousNode.next = node;
			}

			previousNode = currentNode;
			currentNode = currentNode.next;
		}
	}

	removeAt(index) {
		if (this.#head === undefined || index < 0)
			throw new Error('Index out of bounds');

		let currentNode = this.#head;
		let previousNode = undefined;

		if (index === 0)
			return this.#head = currentNode.next;

		for (let i = 0; i <= index; i++) {
			if (currentNode === undefined)
				return;

			if (i === index) {
				previousNode.next = currentNode.next;
				
				return currentNode;
			}

			previousNode = currentNode;
			currentNode = currentNode.next;
		}
	}
}

export class Node {
	#data = undefined;
	#next = undefined;

	constructor(data) {
		this.#data = data;
	}

	get data() {
		return this.#data;
	}

	set data(data) {
		this.#data = data;
	}

	get next() {
		return this.#next;
	}

	set next(node) {
		this.#next = node;
	}
}
