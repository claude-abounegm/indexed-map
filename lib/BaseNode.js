'use strict';

function unimplemented() {
    throw new Error('unimplemented');
}

class BaseNode {
    /** @type {number} */
    get weight() {
        unimplemented();
    }

    remove() {
        unimplemented();
    }

    insertAfter(node) {
        unimplemented();
    }
}

module.exports = BaseNode;