'use strict';

const {
    assert
} = require('chai');

const PriorityMap = require('../../');

function assertEqualNodes(array, expectedList) {
    let index = 0;
    let items = array.filter(item => item.key === expectedList[index++]);
    assert(items.length === expectedList.length, 'should have the correct order');
}

describe('linkedlist test', function () {
    it('should work', function () {
        const list = new PriorityMap();
        list.add('A', { key: 'hello1' });
        list.add('B', { key: 'hello2' });
        list.add('C', { key: 'hello3' });

        assertEqualNodes(list.entriesArray(), ['A', 'B', 'C']);
    });

    it('should change order when index is updated', function() {
        const list = new PriorityMap();
        list.add('A', { key: 'hello1' });
        list.add('B', { key: 'hello2' });
        list.add('C', { key: 'hello3' });
        list.add('D', { key: 'hello4' });
        list.add('E', { key: 'hello5' });

        assertEqualNodes(list.entriesArray(), ['A', 'B', 'C', 'D', 'E']);
        list.get('B').index += 1;
        list.get('A').index += 1;

        assertEqualNodes(list.entriesArray(), ['C', 'D', 'E', 'B', 'A']);

        list.get('B').index -= 1;

        assertEqualNodes(list.entriesArray(), ['C', 'D', 'E', 'B', 'A']);

        list.get('C').index = 2;

        assertEqualNodes(list.entriesArray(), ['D', 'E', 'B', 'A', 'C']);
    });
});