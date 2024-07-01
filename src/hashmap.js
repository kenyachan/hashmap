import { LinkedList } from './linkedList.js';

export class HashMap {
	DEFAULT_BUCKET_SIZE = 16;
	LOAD_FACTOR = 0.75;
	buckets;

	constructor(bucketSize = this.DEFAULT_BUCKET_SIZE) {
		this.buckets = new Array(bucketSize);
	}
	
	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
			hashCode = hashCode % this.buckets.length;
		}

		return this.#validate(hashCode);
	}

	set(key, value) {
		const hashCode = this.hash(key);
		const pair = {
			'key' : key,
			'value' : value
		};

		if (this.buckets[hashCode] === undefined)
			this.buckets[hashCode] = new LinkedList();

		let existingKeyIndex;

		for (let i = 0; i < this.buckets[hashCode].size; i++) {
			if (this.buckets[hashCode].at(i).data.key === key)
				existingKeyIndex = i;
		}

		if (existingKeyIndex !== undefined) {
			this.buckets[hashCode].removeAt(existingKeyIndex);
			this.buckets[hashCode].insertAt(pair, existingKeyIndex);
		} else {
			this.buckets[hashCode].append(pair);

			if (this.length() > (this.buckets.length * this.LOAD_FACTOR))
				this.#growTable();	
		}
	}

	#growTable() {
		const entries = this.entries();
				
		this.buckets = new Array(this.buckets.length * 2);
		
		entries.forEach(entry => this.set(entry[0], entry[1]));
	}

	get(key) {
		const hashCode = this.hash(key);

		if (this.buckets[hashCode] === undefined)
			return null;

		for (let node = this.buckets[hashCode].head; node !== undefined; node = node.next) {
			if (node.data.key === key)
				return node.data.value;
		}

		return null;
	}

	has(key) {
		const hashCode = this.hash(key);

		if (this.buckets[hashCode] === undefined)
			return false;

		for (let node = this.buckets[hashCode].head; node !== undefined; node = node.next) {
			if (node.data.key === key)
				return true;
		}

		return false;
	}

	remove(key) {
		const hashCode = this.hash(key);

		if (this.has(key) === false)
			return false;

		let keyIndex;

		for (let i = 0; i < this.buckets[hashCode].size; i++) {
			if (this.buckets[hashCode].at(i).data.key === key)
				keyIndex = i;
		}

		this.buckets[hashCode].removeAt(keyIndex);

		return true;
	}

	length() {
		let countOfKeys = 0;

		this.buckets.forEach(bucket => countOfKeys += bucket.size);

		return countOfKeys;
	}

	clear() {
		this.buckets.forEach(bucket => {
			for (let i = bucket.size; i > 0; i--) {
				bucket.removeAt(0);
			}
		});
	}

	keys() {
		const keys = new Array();

		this.buckets.forEach(bucket => {
			for (let node = bucket.head; node !== undefined; node = node.next)
				keys.push(node.data.key);
		});

		return keys;
	}

	values() {	
		const values = new Array();

		this.buckets.forEach(bucket => {
			for (let node = bucket.head; node !== undefined; node = node.next)
				values.push(node.data.value);
		});

		return values;
	}

	entries() {
		const entries = new Array();

		this.buckets.forEach(bucket => {
			for (let node = bucket.head; node !== undefined; node = node.next)
				entries.push([node.data.key, node.data.value]);
		});

		return entries;
	}

	#validate(hashcode) {
		if (hashcode < hashcode >= this.buckets.length) {
			throw new Error("Trying to access index out of bound");
		}

		return hashcode;
	}
}

/*
 * When accessing a bucket, make sure you use:
 *
 * if (index < index >= buckets.length) {
 * 		throw new Error("Trying to access index out of bound");
 * }
 *
 */
