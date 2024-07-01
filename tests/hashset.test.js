import { HashSet } from '../src/hashset.js';

const KEYS = ['abc', 'def', 'hij', 'klm', 'nop', 'qrs', 'tuv', 'wxy'];
// 2, 5, 9, 12, 15, 2, 5, 8

describe('Test constructor', () => {
	describe('Create a new hashset with default bucket size of 16', () => {
		const hashset = new HashSet();

		test('hashset should be size 16', () => {
			expect(hashset.buckets.length).toBe(16);
		});	
	});
	
	describe('Create a new hashset with size 32', () => {
		const hashset = new HashSet(32);

		test('hashset should be size 32', () => {
			expect(hashset.buckets.length).toBe(32);
		});
	});
});

describe('Test hash(key) function', () => {
	describe('hash function will always return the same hash code', () => {
		// Arrange
		const hashset = new HashSet();
		const randomNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1);

		// Act
		const results = [];

		for(let i = 0; i < randomNumber; i++)
			results.push(hashset.hash(KEYS[0]));

		// Assert
		test('all entries in results will be 2', () => {
			expect(results.every(result => result === 2)).toBe(true);
		});
	});
});

describe('Test set(key) function', () => {
	describe('set(key) will add key to a bucket', () => {
		// Arrange
		const hashset = new HashSet();

		// Act
		hashset.set(KEYS[0]);

		// Assert
		test('buckets[2] should contain "abc"', () => {
			expect(hashset.buckets[2].contains("abc")).toBe(true);
		});
	});

	describe('set(key) when key is already in set, will not change key', () => {
		// Arrange
		const hashset = new HashSet();
		hashset.set(KEYS[0]);
		
		// Act
		hashset.set("abc");

		// Assert
		test('buckets[2] should contain "abc"', () => {
			expect(hashset.buckets[2].contains("abc")).toBe(true);
		});

		test('hashset should only have one entry', () => {
			expect(hashset.buckets.reduce((count, bucket) => count + bucket.size, 0)).toEqual(1);
		});
	});
});

describe('Test get(key) function', () => {
	describe('When hashset is empty, get(key) will return null', () => {
		const hashset = new HashSet();

		const key = hashset.get(KEYS[0]);

		test('key should be null', () => {
			expect(key).toBeNull();
		});
	});

	describe('When key is not in hashset, get(key) will return null', () => {
		const hashset = new HashSet();
		for (let i = 1; i < KEYS.length; i++)
			hashset.set(KEYS[i]);

		const key = hashset.get(KEYS[0]);

		test('key should be null', () => {
			expect(key).toBeNull();
		});

	});

	describe('When key is in hashset, get(key) will return key', () => {
		const hashset = new HashSet();
		hashset.set(KEYS[0]);

		const key = hashset.get(KEYS[0]);

		test('key should be "abc"', () => {
			expect(key).toBe(KEYS[0]);
		});
	});
});

describe('Test has(key) function', () => {
	describe('When key is not in the hashset, has(key) will return false', () => {
		const hashset = new HashSet();
		const KEY = 'abc';

		const result = hashset.has(KEY);

		test('has(key) should equal false', () => {
			expect(result).toEqual(false);
		});
	});

	describe('When key is in the hashset, has(key) will return true', () => {
		const hashset = new HashSet();
		const KEY = 'hij';
		KEYS.forEach(key => hashset.set(key));

		const result = hashset.has(KEY);

		test('has(key) should equal true', () => {
			expect(result).toEqual(true);
		});
	});
});

describe('Test remove(key) function', () => {
	describe('When key is not in hashset, remove(key) will return false', () => {
		const hashset = new HashSet();
		const KEY = 'abc';

		const result = hashset.remove(KEY);

		test('result should equal false', () => {
			expect(result).toEqual(false);
		});
	});
	describe('When key is in hashset, remove(key) will return true', () => {
		const hashset = new HashSet();
		const KEY = 'hij';
		KEYS.forEach(key => hashset.set(key));

		const result = hashset.remove(KEY);

		test('result should equal true', () => {
			expect(result).toEqual(true);
		});
	});
});

describe('Test length() function', () => {
	describe('When hashset is empty, length() will return 0', () => {
		const hashset = new HashSet();

		test('length should equal 0', () => {
			const length = hashset.length();

			expect(length).toEqual(0);
		});
	});

	describe('When hashset is not empty, length() will return the number of keys in hashset', () => {
		const hashset = new HashSet();
		KEYS.forEach(key => hashset.set(key));

		test('length should equal 8', () => {
			const length = hashset.length();

			expect(length).toEqual(8);
		});
	});
});

describe('Test clear() function', () => {
	describe('When hashset is empty, clear() will do nothing', () => {
		const hashset = new HashSet();

		hashset.clear();

		test('hashset should have no entries', () => {
			expect(hashset.length()).toEqual(0);
		});
	});

	describe('When hashset is not emtpy, clear() will remove all entries', () => {
		const hashset = new HashSet();
		KEYS.forEach(key => hashset.set(key));

		hashset.clear();

		test('hashset should have no entries', () => {
			expect(hashset.length()).toEqual(0);
		});
	});
});

describe('Test entries() function', () => {
	describe('When hashset is empty, entries() will return an empty array', () => {
		const hashset = new HashSet();

		const entries = hashset.entries();

		test('entries should be []', () => {
			expect(entries).toMatchObject(new Array());
		});
	});

	describe('When hashset is not empty, entries() will return an array of all keys', () => {
		const hashset = new HashSet();
		KEYS.forEach(key => hashset.set(key))

		const entries = hashset.entries();

		test('entries should be KEYS', () => {
			expect(KEYS.every(key => entries.includes(key))).toBe(true);
		});
	});
});

