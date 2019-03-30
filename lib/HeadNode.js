'use strict';

const PositationalNode = require('./PositationalNode');

class HeadNode extends PositationalNode {
    constructor() {
        super();
        this.isHead = true;
    }

    remove() {
        throw new Error('cannot remove head node');
    }
}

module.exports = HeadNode;