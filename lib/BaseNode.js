'use strict';

function unimplemented() {
    throw new Error('unimplemented');
}

class BaseNode {
    /** @type {number} */
    get index() {
        unimplemented();
    }

    set index(newIndex) {
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