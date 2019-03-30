'use strict';

const {
    assert
} = require('chai');

function assertEqualNodes(array, expectedList) {
    console.log(array);
    let index = 0;
    let items = array.filter(item => !item.isHead && item !== expectedList[index++]);
    assert(items.length === 0);
}

const PositionalList = require('../../lib/PositionalList');

const list = new PositionalList();

list.set('A', 'A');
list.set('B', 'B');

assertEqualNodes(list.toArray(), ['A', 'B']);