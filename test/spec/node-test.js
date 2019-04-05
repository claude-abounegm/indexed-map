'use strict';

const {
    assert
} = require('chai');

const IndexedNode = require('../../lib/IndexedNode');

describe('Node', function () {
    it('should work', function () {
        // A <-> B
        const A = new IndexedNode('A', 'A');
        const B = new IndexedNode('B', 'B', A);
        assert(A.next === B);
        assert(A.prev === null);
        assert(B.next === null);
        assert(B.prev === A);

        // A <-> C <-> B
        const C = new IndexedNode('C', 'C', A);
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
    });
});