'use strict';

function assert(t) {
    if (!t) {
        throw new Error('assert failed');
    }
}

const PositationalNode = require('../../lib/PositationalNode');

// A <-> B
const A = new PositationalNode('A');
const B = new PositationalNode('B');
B.insertAfter(A);
assert(A.next === B);
assert(A.prev === null);
assert(B.next === null);
assert(B.prev === A);

// A <-> C <-> B
const C = new PositationalNode('C');
C.insertAfter(A);
assert(A.next === C);
assert(A.prev === null);
assert(B.next === null);
assert(B.prev === C);
assert(C.next === B);
assert(C.prev === A);

// A <-> B
C.remove();
assert(A.next === B);
assert(A.prev === null);
assert(B.next === null);
assert(B.prev === A);
assert(C.prev === null);
assert(C.next === null);

// None
A.remove();
assert(A.prev === null);
assert(A.next === null);
assert(B.prev === null);
assert(B.next === null);