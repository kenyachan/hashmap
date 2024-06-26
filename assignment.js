import { HashMap } from './hashmap.js';
/*
 * 2. Create a new instance of your hash map and set the load factor to be 0.75.
 */
const test = new HashMap();

/*
 * 3. Populate the hashmap using the set(key, value) method
 */
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

/*
 * 4. After populating your hash map, check the capacity, should be 0.75.
 */
console.log(`Capacity: ${test.buckets.length}, Load ${test.length()/test.buckets.length}`);

/*
 * 5. Override some values using set(key, value)
 */
test.set('kite', 'notColour');
test.set('lion', 'roar');
test.set('ice cream', 'chocolate');
console.log(test.entries());

/*
 * 6. Add another entry
 */
test.set('moon', 'silver');

/*
 * 7. Check hash map has grown
 */
console.log(`Capacity: ${test.buckets.length}, Load ${test.length()/test.buckets.length}`);

console.log(test.entries());

/*
 * 8. Overwrite a few nodes using set(key, value) to ensure it's still working as expected
 */

test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('ice cream', 'cold');

console.log(test.entries());

/*
 * 9. Test all other methods get, remove, length, clear, keys, values.
 */

console.log(test.get('apple'));
console.log(test.remove('dog'));
console.log(test.entries());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.clear();
console.log(test.entries());
