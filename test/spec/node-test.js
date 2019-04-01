'use strict';

const {
    assert
} = require('chai');

const PriorityNode = require('../../lib/PriorityNode');

describe('Node', function () {
    it('should work', function () {
        // A <-> B
        const A = new PriorityNode('A', 'A');
        const B = new PriorityNode('B', 'B', A);
        assert(A.next === B);
        assert(A.prev === null);
        assert(B.next === null);
        assert(B.prev === A);

        // A <-> C <-> B
        const C = new PriorityNode('C', 'C', A);
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