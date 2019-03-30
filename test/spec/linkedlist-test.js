'use strict';

const {
    assert
} = require('chai');

const PositionalList = require('../../lib/PositionalList');

function assertEqualNodes(array, expectedList) {
    let index = 0;
    let items = array.filter(item => item !== expectedList[index++]);
    assert(items.length === 0, 'should have the correct order');
}

describe('linkedlist test', function () {
    it('should work', function () {
        const list = new PositionalList();

        list.set('A', 'A');
        list.set('B', 'B');

        assertEqualNodes(list.toArray(), ['A', 'B']);
    });
});