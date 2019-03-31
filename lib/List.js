'use strict';

const PositionalList = require('./PositionalList');

// class Item {
//     constructor(list) {
//         this.list = list;
//     }


// }

class List {
    constructor() {
        this._list = new PositionalList();
    }

    add(key, value, position) {
        this._list.add(key, value, position);
    }

    get(key) {
        const node = this._list.get(key);
        return node && node.value;
    }

    get first() {
        const node = this._list.first;
        if(node) {
            return {

            };
        }
        return node && node.value;
    }

    get last() {
        const node = this._list.last;
        return node && node.value;
    }
}

module.exports = List;