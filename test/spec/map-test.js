'use strict';

const {
    assert
} = require('chai');

const WeightedMap = require('../..');

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

    it('should change order when weight is updated', function () {
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

    it('should respect max weight', function () {
        const map = new WeightedMap(2);

        map.add('A', 'A');

        try {
            map.get('A').weight = 5;
            throw new Error('should throw before');
        } catch { }

        map.get('A').weight = 2;
    });

    it('should throw on invalid key', function () {
        const map = new WeightedMap();

        try {
            map.get('A');
            throw new Error('should throw before');
        } catch { }
    });

    it('should transform values on entries', function () {
        const map = new WeightedMap();

        map.add('A', 1);
        map.add('B', 2);

        try {
            for (const _x of map.entries({}));
            throw new Error('should throw before');
        } catch { }

        let i = 1;
        for (const value of map.entries(entry => entry.value)) {
            if (value !== i++) {
                throw new Error('should match numbers');
            }
        }
    });

    it('should delete values correctly', function () {
        const map = new WeightedMap();

        map.add('A', 1);
        map.add('B', 2);

        assert(map.delete('A').value === 1);
        assert(map.size === 1);
    });

    it('should clear map and handle errors', function () {
        const map = new WeightedMap();

        map.add('A', 1);
        map.add('B', 2);

        map.clear();
        assert(map.size === 0);

        map.add('A', 3);

        assert(map.get('A').value === 3);

        map.update('A', 4);

        assert(map.get('A').value === 4);

        try {
            map.add('A', 5);
            throw new Error('should throw before');
        } catch { }
    });
});