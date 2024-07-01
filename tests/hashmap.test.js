import { HashMap } from '../src/hashmap';

const testData = [
	{'key': 'abc', 'value': '123'},
	{'key': 'def', 'value': '456'},
	{'key': 'ghi', 'value': '789'},
	{'key': 'klm', 'value': '012'},
	{'key': 'nop', 'value': '345'}
];

describe('Test constructor', () => {
	describe('constructor will return a hashmap', () => {	
		const hashmap = new HashMap();

		test('hashmap should be an instance of HashMap', () => {
			expect(hashmap).toBeInstanceOf(HashMap);
		});	
	});

	describe('Create a hashmap with default bucket size of 16', () => {
		test('hashmap should be size 16', () => {
			const hashmap = new HashMap();

			expect(hashmap.buckets.length).toBe(16);
		});	
	});

	describe('Create a hashmap of size 32', () => {
		test('Hashmap should be size 32', () => {
			const SIZE = 32;
			const hashmap = new HashMap(SIZE);

			expect(hashmap.buckets.length).toBe(SIZE);
		});
	});
});

describe('Test hash(key)', () => {
	describe('hash(key) should return the same value everytime for a given key', () => {
		const hashmap = new HashMap();
		const randomNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1);
		const results = new Array();

		for (let i = 0; i < randomNumber; i++)
			results.push(hashmap.hash('abc'));

		expect(results.every(result => result === 2)).toBe(true);
	});
});

describe('Test set(key, value)', () => {
	describe('When a key-value pair is not in hashmap, set(key, value) will add it', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';
		const VALUE = '123';
		const pair = {
			'key' : KEY,
			'value' : VALUE
		}
				
		hashmap.set(KEY, VALUE);

		test('pair should be added to hashmap', () => {
			expect(hashmap.buckets[2].contains(pair)).toBeTruthy();
		});
	});

	describe('When a key-value pair is in hashmap, set(key, value) will update value', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';
		const VALUE = 123;
		const UPDATED_VALUE = 456;
		const pair = {
			'key' : KEY,
			'value' : UPDATED_VALUE
		};

		hashmap.set(KEY, VALUE);
		hashmap.set(KEY, UPDATED_VALUE);

		test('pair should have value "456"', () => {
			expect(hashmap.buckets[2].contains(pair)).toBeTruthy();
		});
	});

	describe('When hashmap length reaches load capacity, hashmap will grow 2x', () => {
		const hashmap = new HashMap();
		hashmap.set('apple', 'red');
		hashmap.set('banana', 'yellow');
		hashmap.set('carrot', 'orange');
		hashmap.set('dog', 'brown');
		hashmap.set('elephant', 'gray');
		hashmap.set('frog', 'green');
		hashmap.set('grape', 'purple');
		hashmap.set('hat', 'black');
		hashmap.set('ice cream', 'white');
		hashmap.set('jacket', 'blue');
		hashmap.set('kite', 'pink');
		hashmap.set('lion', 'golden');

		hashmap.set('moon', 'silver');

		test('hashmap buckets should be size 32', () => {
			expect(hashmap.buckets.length).toBe(32);
		});
	});
});

describe('Test get(key)', () => {
	describe('When key is not in hashmap, get(key) will return null', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';

		const result = hashmap.get(KEY);

		test('results should be null', () => {
			expect(hashmap.get(KEY)).toBeNull();
		});
	});

	describe('When key is in hashmap, get(key) will return associated value', () => {
		const hashmap = new HashMap();
		testData.forEach(data => hashmap.set(data.key, data.value));
		const key = 'abc';
		const expectedValue = '123';

		const value = hashmap.get(key);

		test('value should be "123"', () => {
			expect(value).toBe(expectedValue);
		});	
	});
});

describe('Test has(key)', () => {
	describe('When hashmap is empty, has(key) will return false', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';

		test('has(key) should be false', () => {
			expect(hashmap.has(KEY)).toBe(false);
		});
	});

	describe('When key is not in hashmap, has(key) will return false', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';
		const VALUE = '123';
		const KEY2 = 'def';

		hashmap.set(KEY, VALUE);

		test('has(key) should be false', () => {
			expect(hashmap.has(KEY2)).toBe(false);
		});
	});

	describe('When key is in hashmap, has(key) will return true', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';
		const VALUE = '123';

		hashmap.set(KEY,VALUE);

		test('has(key) shoud return true', () => {
			expect(hashmap.has(KEY)).toBe(true);
		});
	});
});

describe('Test remove(key)', () => {
	describe('When hashmap is empty, remove(key) will return false', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';

		test('remove(key) should return false', () => {
			expect(hashmap.remove(KEY)).toBe(false);
		});	
	});

	describe('When key is not in hashmap, remove(key) will return false', () => {
		const hashmap = new HashMap();
		const key = 'xyz';
		testData.forEach(data => hashmap.set(data.key, data.value));

		test('remove(key), should return false', () => {
			expect(hashmap.remove(key)).toBe(false);
		});
	});
	
	describe('When key is in hashmap, remove(key) will return true', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';
		const VALUE = '123';
		hashmap.set(KEY, VALUE);

		const result = hashmap.remove(KEY);
			
		test('result should be true', () => {
			expect(result).toEqual(true);
		});	

		test('hashmap should not contain { key: "abc", value: "123" }', () => {
			expect(hashmap.has(KEY)).toBe(false);
		});
	});
});

describe('Test length()', () => {
	describe('When hashmap is empty, length() will return 0', () => {
		const hashmap = new HashMap();

		test('length() should be 0', () => {
			expect(hashmap.length()).toBe(0);
		});
	});

	describe('When hashmap is not empty, length() will return number of entries', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';
		const VALUE = '123';
		
		hashmap.set(KEY, VALUE);

		test('length() should be 1', () => {
			expect(hashmap.length()).toBe(1);
		});
	});
});

describe('Test clear()', () => {
	describe('When hashmap is empty, clear() will do nothing', () => {
		const hashmap = new HashMap();
		
		hashmap.clear();

		test('hashmap should have no entries', () => {
			expect(hashmap.length()).toBe(0);
		});
	});

	describe('When hashmap is not empty, clear() will remove all entries', () => {
		const hashmap = new HashMap();
		testData.forEach(data => hashmap.set(data.key, data.value));

		hashmap.clear();

		test('hashmap should have no entries', () => {
			expect(hashmap.length()).toBe(0);
		});
	});
});

describe('Test keys()', () => {
	describe('When hashmap is empty, keys() will return emtpy array', () => {
		const hashmap = new HashMap();
		
		const keys = hashmap.keys();

		test('keys() should be empty', () => {
			expect(keys).toMatchObject(new Array());
			expect(keys.length).toBe(0);
		});
	});

	describe('When hashmap is not empty, keys() will returns an array of keys', () => {
		const hashmap = new HashMap();
		testData.forEach(data => hashmap.set(data.key, data.value));
		const testDataKeys = testData.map(pair => pair.key);

		const keys = hashmap.keys();

		test('keys() should contain test all testDataKeys', () => {
			expect(keys.every(key => testDataKeys.includes(key))).toBe(true);
		});
	});
});

describe('Test values()', () => {
	describe('When hashmap is empty, values() will return empty array', () => {
		const hashmap = new HashMap();
		const values = hashmap.values();

		test('values() should be empty array', () => {
			expect(values).toMatchObject(new Array());
		});
	});

	describe('When hashmap is not empty, values() will return array of values', () => {
		const hashmap = new HashMap();
		testData.forEach(pair => hashmap.set(pair.key, pair.value));
		const testDataValues = testData.map(pair => pair.value);

		const values = hashmap.values();

		test('values() should return array of values', () => {
			expect(values.every(value => testDataValues.includes(value))).toBe(true);
		});
	});
});

describe('Test entries()', () => {
	describe('When hashmap is empty, entries() will return emtpy array', () => {
		const hashmap = new HashMap();

		test('entries() should return empty array', () => {
			expect(hashmap.entries()).toMatchObject(new Array());
		});	
	});

	describe('When hashmap is not empty, entries() will return array of key-value arrays', () => {
		const hashmap = new HashMap();
		testData.forEach(pair => hashmap.set(pair.key, pair.value));
		const testDataEntries = testData.map(pair => [pair.key, pair.value]);

		const entries = hashmap.entries();

		test('entries() should return array of entries', () => {
			expect(JSON.stringify(entries)).toEqual(JSON.stringify(testDataEntries));
		});
	});
});
