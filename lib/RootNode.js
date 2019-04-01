'use strict';

const BaseNode = require('./BaseNode');

class RootNode extends BaseNode {
    constructor() {
        super();
        this.isRoot = true;
    }

    get index() {
        return -1;
    }
}

module.exports = RootNode;