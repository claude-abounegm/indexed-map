'use strict';

const {
    assert
} = require('chai');

const WeightedMap = require('../../');

function assertEqualNodes(array, expectedList) {
    let weight = 0;
    let items = array.filter(item => item.key === expectedList[weight++]);
    assert(items.length === expectedList.length, 'should have the correct order');
}

describe('weighted map test', function () {
    it('should work', function () {
        const map = new WeightedMap();
        map.add('A', { key: 'hello1' });
        map.add('B', { key: 'hello2' });
        map.add('C', { key: 'hello3' });

        assertEqualNodes(map.entriesArray(), ['A', 'B', 'C']);
    });

    it('should change order when weight is updated', function() {
        const map = new WeightedMap();
        map.add('A', { key: 'hello1' });
        map.add('B', { key: 'hello2' });
        map.add('C', { key: 'hello3' });
        map.add('D', { key: 'hello4' });
        map.add('E', { key: 'hello5' });

        assertEqualNodes(map.entriesArray(), ['A', 'B', 'C', 'D', 'E']);
        map.get('B').weight += 1;
        map.get('A').weight += 1;

        assertEqualNodes(map.entriesArray(), ['C', 'D', 'E', 'B', 'A']);

        map.get('B').weight -= 1;

        assertEqualNodes(map.entriesArray(), ['C', 'D', 'E', 'B', 'A']);

        map.get('C').weight = 2;

        assertEqualNodes(map.entriesArray(), ['D', 'E', 'B', 'A', 'C']);
    });
});