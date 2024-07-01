import { LinkedList } from './linkedlist.js';

export class HashSet {
	DEFAULT_BUCKETS_SIZE = 16;
	LOAD_FACTOR = 0.75;
	buckets;

	constructor(bucketsSize = this.DEFAULT_BUCKETS_SIZE) {
		this.buckets = new Array(bucketsSize);
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
			hashCode = hashCode % this.buckets.length;
		}

		return hashCode;
	}

	set(key) {
		const hashCode = this.hash(key);

		if (this.buckets[hashCode] === undefined)
			this.buckets[hashCode] = new LinkedList();

		let existingKeyIndex;

		for (let i = 0; i < this.buckets[hashCode].size; i++) {
			if (this.buckets[hashCode].at(i).data === key)
				existingKeyIndex = i;
		}

		if (existingKeyIndex !== undefined) {
			this.buckets[hashCode].removeAt(existingKeyIndex);
			this.buckets[hashCode].insertAt(key, existingKeyIndex);
		} else {
			this.buckets[hashCode].append(key);
		}
	}

	get(key) {
		const hashCode = this.hash(key);

		if (this.buckets[hashCode] === undefined)
			return null;

		for (let node = this.buckets[hashCode].head; node !== undefined; node = node.next) {
			if (node.data === key)
				return node.data;
		}

		return null;
	}

	has(key) {
		const hashCode = this.hash(key);

		if (this.buckets[hashCode] === undefined)
			return false;

		for (let node = this.buckets[hashCode].head; node !== undefined; node = node.next) {
			if (node.data === key)
				return true;
		}
	}

	remove(key){
		const hashCode = this.hash(key);

		if (this.buckets[hashCode] === undefined)
			return false;

		for (let node = this.buckets[hashCode].head; node !== undefined; node = node.next) {
			if (node.data === key) {
				const index = this.buckets[hashCode].find(node.data);
				this.buckets[hashCode].removeAt(index);

				return true;
			}
		}
	}

	length() {
		let keyCount = 0;

		this.buckets.forEach(bucket => keyCount += bucket.size);

		return keyCount;
	}

	clear(){
		this.buckets.forEach(bucket => {
			for (let i = bucket.size; i >= 0; i--)
				bucket.removeAt(i);
		});
	}

	entries() {
		const entries = new Array();

		this.buckets.forEach(bucket => {
			for (let node = bucket.head; node !== undefined; node = node.next)
				entries.push(node.data);
		});

		return entries;
	}
}
