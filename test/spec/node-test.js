'use strict';

const {
    assert
} = require('chai');

const WeightedNode = require('../../lib/WeightedNode');

describe('Node', function () {
    it('should work', function () {
        const dummyMap = { maxWeight: Infinity };

        // A <-> B
        const A = new WeightedNode(dummyMap, 'A', 'A');
        const B = new WeightedNode(dummyMap, 'B', 'B', A);
        assert(A.next === B);
        assert(A.prev === null);
        assert(B.next === null);
        assert(B.prev === A);

        // A <-> C <-> B
        const C = new WeightedNode(dummyMap, 'C', 'C', A);
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