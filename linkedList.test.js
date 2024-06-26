import { LinkedList, Node } from './linkedList.js';

const ITEMS = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
const OBJS = [{'key' : 1}, {'key' : 2}, {'key' : 3}, {'key' : 4}, {'key' : 5}];

describe('append(data) adds a new node containing "data" to the end of the list', () => {
	const linkedList = new LinkedList();

	test('First item will be "Item 1"', () => {
		linkedList.append(ITEMS[0]);

		expect(linkedList.head.data).toBe(ITEMS[0]);
	});

	test('Second item will be "Item 2"', () => {
		linkedList.append(ITEMS[1]);

		expect(linkedList.head.next.data).toBe(ITEMS[1]);
	});
});

describe('prepend(data) adds a new node containing "data" to the start of the list', () => {
	const linkedList = new LinkedList();

	test('First item will be "Item 1"', () => {
		linkedList.prepend(ITEMS[0]);

		expect(linkedList.head.data).toBe(ITEMS[0]);
	});

	test('First item will be "Item 2"', () => {
		linkedList.prepend(ITEMS[1]);

		expect(linkedList.head.data).toBe(ITEMS[1]);
	});
});

describe('size returns the total number of nodes in the list', () => {
	const linkedList = new LinkedList();

	test('linkedList will be size 0', () => {
		expect(linkedList.size).toEqual(0);
	});

	test('linkedList will be size 1', () => {
		linkedList.append('Item 1');

		expect(linkedList.size).toEqual(1);
	});
});

describe('head returns the first node in the list', () => {
	const linkedList = new LinkedList();

	test('linkedList.head will return undefined', () => {
		expect(linkedList.head).toBeUndefined();
	});

	test('linkedList.head will be a Node', () => {
		linkedList.append(ITEMS[0]);

		expect(linkedList.head).toBeInstanceOf(Node);
	});
});

describe('tail returns the last node in the list', () => {
	const linkedList = new LinkedList();

	test('linkedList.tail will return undefined', () => {
		expect(linkedList.tail).toBeUndefined();
	});

	test('linkedList.tail will return a Node with "Item 5"', () => {
		ITEMS.forEach(item => linkedList.append(item));

		expect(linkedList.tail).toBeInstanceOf(Node);
		expect(linkedList.tail.data).toBe(ITEMS[4]);
	});
});

describe('at(index) returns the node at the given "index"', () => {
	const ERROR_STRING = 'Index out of bounds';
	const linkedList = new LinkedList();

	test('at(0) will throw an index out of bounds error', () => {
		expect(() => linkedList.at(0)).toThrow(ERROR_STRING);
	});

	test('at(1) will throw an index out of bounds error', () => {
		linkedList.append(ITEMS[0]);

		expect(() => linkedList.at(1)).toThrow(ERROR_STRING);
	});

	test('at(0) will be a node with data "Item 1"', () => {
		expect(linkedList.at(0)).toBeInstanceOf(Node);
		expect(linkedList.at(0).data).toBe(ITEMS[0]);
	});
});

describe('pop() removes the last element from the list', () => {
	const linkedList = new LinkedList();

	test('linkedList.pop() will return undefined', () => {
		expect(linkedList.pop()).toBeUndefined();
	});

	test('linkedList.pop() will return a Node with "Item 1"', () => {
		linkedList.append(ITEMS[0]);

		const node = linkedList.pop();

		expect(node).toBeInstanceOf(Node);
		expect(node.data).toBe(ITEMS[0]);
	});

	test('linkedList.pop() will return a Node with "Item 5"', () => {
		ITEMS.forEach(item => linkedList.append(item));

		const node = linkedList.pop();

		expect(node).toBeInstanceOf(Node);
		expect(node.data).toBe(ITEMS[4]);
	});
});

describe('contains(data) returns true if the passed in "data" is in the list and otherwise returns false', () => {
	const linkedList = new LinkedList();

	test('contains(data) will return false when head is undefined', () => {
		expect(linkedList.contains(ITEMS[0])).toBe(false);
	});

	test('contains("Item 1") will return true when "Item 1" is in the linkedList', () => {
		linkedList.append(ITEMS[0]);

		expect(linkedList.contains(ITEMS[0])).toBe(true);
	});

	test('contains(obj) will return true when obj is in the linkedList', () => {
		const obj = {
			'key' : 'abc',
			'value' : 123
		}

		let list = new LinkedList();

		list.append(
			{
				'key' : 'abc',
				'value' : 123
			}
		);

		expect(list.contains(obj)).toBe(true);


	});
});

describe('find(data) returns the index of the node containing "data", or null if not found"', () => {
	const linkedList = new LinkedList();

	OBJS.forEach(item => linkedList.append(item));

	test('find("hello") will return null', () => {
		expect(linkedList.find("hello")).toBeNull();
	});

	test('find("Item 1") will return index "0"', () => {
		const index = 0;
		expect(linkedList.find(OBJS[index])).toBe(index);
	});
});

describe('toString() represents your LinkedList objects as strings', () => {
	const linkedList = new LinkedList();
	const itemsString = "( Item 1 ) => ( Item 2 ) => ( Item 3 ) => ( Item 4 ) => ( Item 5 ) => null"

	test('toString() on empty linkedList will return " => null"', () => {
		expect(linkedList.toString()).toBe(' => null');
	});

	test('toString() on linkedList will return itemString', () => {
		ITEMS.forEach(item => linkedList.append(item));

		expect(linkedList.toString()).toEqual(itemsString);
	});
});

describe('insertAt(data, index) inserts a new Node with provided data at given index', () => {
	const linkedList = new LinkedList();

	test('insertAt(data, 1) in empty linked list will throw an index out of bounds error', () => {
		expect(() => linkedList.insertAt(ITEMS[0], 3)).toThrow('Index out of bounds');
	});

	test('insertAt(data, 0) in empty linked list will insert data at head', () => {
		linkedList.insertAt(ITEMS[0], 0);

		expect(linkedList.head.data).toBe(ITEMS[0]);
	});

	test('insertAt(data, 1) in a linked list with 1 item will insert into head.next', () => {
		linkedList.insertAt(ITEMS[2], 1);

		expect(linkedList.head.next.data).toBe(ITEMS[2]);
	});

	test('insertAt(data, 1) in a linked list with 2 itesm will insert between the two items', () => {
		linkedList.insertAt(ITEMS[1], 1);
		
		expect(linkedList.head.next.data).toBe(ITEMS[1]);
	});
});

describe('removeAt(index) removes a Node at the given index', () => {
	const linkedList = new LinkedList();

	test('removeAt() an empty linked list will throw an index out of bounds error', () => {
		expect(() => linkedList.removeAt(0)).toThrow('Index out of bounds');
	});

	test('removeAt(0) on a linked list with one item will remove item', () => {
		linkedList.append(ITEMS[0]);

		linkedList.removeAt(0);

		expect(linkedList.head).toBeUndefined();
	});

	test('removeAt(1) on a linked list with 3 items will remove item', () => {
		linkedList.append(ITEMS[0]);
		linkedList.append(ITEMS[1]);
		linkedList.append(ITEMS[2]);

		linkedList.removeAt(1);

		expect(linkedList.head.next.data).toBe(ITEMS[2]);
	});
});
