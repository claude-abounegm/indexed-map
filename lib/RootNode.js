'use strict';

const BaseNode = require('./BaseNode');

class RootNode extends BaseNode {
    constructor() {
        super();
    }

    get isRoot() {
        return true;
    }

    get weight() {
        return -1;
    }
}

module.exports = RootNode;