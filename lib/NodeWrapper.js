'use strict';

const PositationalNode = require('./PositationalNode');

class NodeWrapper {
    /**
     * 
     * @param {PositationalNode} node 
     */
    constructor(node) {
        /** @private */
        this._node = node;
    }

    get index() {
        return this._node.index;
    }

    get key() {
        return this._node.key;
    }

    get value() {
        return this._node.value;
    }
}

module.exports = NodeWrapper;