import { HashMap } from './hashmap';

const testData = [
	{'key': 'abc', 'value': '123'},
	{'key': 'def', 'value': '456'},
	{'key': 'ghi', 'value': '789'},
	{'key': 'klm', 'value': '012'},
	{'key': 'nop', 'value': '345'}
];

describe('Test the constructor creates a hashmap', () => {
	test('HashMap constructor will return a hashmap', () => {
		const hashmap = new HashMap();

		expect(hashmap).toBeInstanceOf(HashMap);
	});

	test('Hashmap will be of size 16', () => {
		const hashmap = new HashMap();

		expect(hashmap.buckets.length).toBe(16);
	});

	test('Hashmap will be of size 32', () => {
		const SIZE = 32;
		const hashmap = new HashMap(SIZE);

		expect(hashmap.buckets.length).toBe(SIZE);
	});
});

describe('Test the "hash" function', () => {
	test('Hash function should return the same value every time for a given key', () => {
		const hashmap = new HashMap();
		const testDataHashCodes = [2, 5, 8, 12, 15];

		const hashCodes = testData.map(pair => hashmap.hash(pair.key));

		expect(hashCodes.every(hashCode => testDataHashCodes.includes(hashCode))).toBe(true);
	});
});

describe('Test the hashmap "set" function', () => {
	test('set(key, value) will add to the hashmap', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';
		const VALUE = '123';
		const pair = {
			'key' : KEY,
			'value' : VALUE
		}
				
		hashmap.set(KEY, VALUE);

		expect(hashmap.buckets[2].contains(pair)).toBeTruthy();
	});

	test('set(key, value) will update the value when the same key is provided', () => {
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

		expect(hashmap.buckets[2].contains(pair)).toBeTruthy();
	});
});

describe('Test the hashmap "get" function', () => {
	test('get(key) will return null when it cannot find the key', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';

		expect(hashmap.get(KEY)).toBeNull();
	});

	test('get(key) will return the value associated with it', () => {
		const hashmap = new HashMap();
		const KEY1 = 'abc';
		const KEY2 = 'abcd';
		const VALUE1 = '123';
		const VALUE2 = '456';

		hashmap.set(KEY1, VALUE1);
		hashmap.set(KEY2, VALUE2);

		expect(hashmap.get(KEY1)).toBe(VALUE1);
	});
});

describe('Test hashmap "has" function', () => {
	test('has will return false when the key does not exists', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';

		expect(hashmap.has(KEY)).toBe(false);
	});

	test('has will return false when key is not found and hashmap contains data', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';
		const VALUE = '123';
		const KEY2 = 'def';

		hashmap.set(KEY, VALUE);

		expect(hashmap.has(KEY2)).toBe(false);
	});

	test('has will return true when key exists in the hashmap', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';
		const VALUE = '123';

		hashmap.set(KEY,VALUE);

		expect(hashmap.has(KEY)).toBe(true);
	});
});

describe('Test hashmap "remove" function', () => {
	test('remove returns false when key does not exist in hash map', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';

		expect(hashmap.remove(KEY)).toBe(false);
	});

	test('remove will remove the key-value pair if it exists in the hashmap', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';
		const VALUE = '123';

		hashmap.set(KEY, VALUE);
		const result = hashmap.remove(KEY);
		
		expect(hashmap.has(KEY)).toBe(false);
		expect(hashmap.buckets[2].head).toBeUndefined();
	});
});

describe('Test hashmap "length" function', () => {
	test('length of hashmap will return "0"', () => {
		const hashmap = new HashMap();

		expect(hashmap.length()).toBe(0);
	});

	test('length of hashmap will reutrn "1"', () => {
		const hashmap = new HashMap();
		const KEY = 'abc';
		const VALUE = '123';
		
		hashmap.set(KEY, VALUE);

		expect(hashmap.length()).toBe(1);
	});
});

describe('Test hashmap "clear" function', () => {
	test('hashmap.length will return 0', () => {
		const hashmap = new HashMap();
		testData.forEach(data => hashmap.set(data.key, data.value));

		hashmap.clear();

		expect(hashmap.length()).toBe(0);
	});
});

describe('Test hashmap "keys" function', () => {
	test('hashmap will return array of keys', () => {
		const hashmap = new HashMap();
		testData.forEach(data => hashmap.set(data.key, data.value));
		const testDataKeys = testData.map(pair => pair.key);

		const keys = hashmap.keys();

		expect(keys.every(key => testDataKeys.includes(key))).toBe(true);
	});

	test('hashmap will return empty array', () => {
		const hashmap = new HashMap();
		
		const keys = hashmap.keys();

		expect(keys).toEqual(new Array());
		expect(keys.length).toBe(0);
	});
});

describe('Test hashmap "value" function', () => {
	test('hashmap will return array of values', () => {
		const hashmap = new HashMap();
		testData.forEach(pair => hashmap.set(pair.key, pair.value));
		const testDataValues = testData.map(pair => pair.value);

		const values = hashmap.values();

		expect(values.every(value => testDataValues.includes(value))).toBe(true);
	});

	test('hashmap will return emtpy array', () => {
		const hashmap = new HashMap();

		const values = hashmap.values();

		expect(values).toEqual(new Array());
		expect(values.length).toBe(0);
	});
});

describe('Test hashmap "entries" function', () => {
	test('hashmap will return array of entries', () => {
		const hashmap = new HashMap();
		testData.forEach(pair => hashmap.set(pair.key, pair.value));
		const testDataEntries = testData.map(pair => [pair.key, pair.value]);

		const entries = hashmap.entries();

		expect(JSON.stringify(entries)).toEqual(JSON.stringify(testDataEntries));
	});

	test('hashmap will return empty array', () => {
		const hashmap = new HashMap();

		const entries = hashmap.entries();

		expect(entries).toEqual(new Array());
		expect(entries.length).toBe(0);
	});
});
