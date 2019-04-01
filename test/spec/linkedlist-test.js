'use strict';

const {
    assert
} = require('chai');

const PositionalList = require('../../lib/PositionalList');

function assertEqualNodes(array, expectedList) {
    let index = 0;
    let items = array.filter(item => item.value === expectedList[index++]);
    assert(items.length === expectedList.length, 'should have the correct order');
}

describe('linkedlist test', function () {
    it('should work', function () {
        const list = new PositionalList();

        list.add('A', 'A');
        list.add('B', 'B');

        assertEqualNodes(list.entriesArray(), ['A', 'B']);
    });
});