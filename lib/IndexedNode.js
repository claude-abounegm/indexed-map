'use strict';

const _ = require('lodash');

const IndexedMap = require('./IndexedMap');
const BaseNode = require('./BaseNode');

class IndexedNode extends BaseNode {
    constructor(parent, key, value, node, index) {
        super();

        /** @type {IndexedNode} */
        this.next = null;
        /** @type {IndexedNode} */
        this.prev = null;

        /** @type {IndexedMap} */
        this.parent = parent;
        this.key = key;
        this.value = value;

        if (node instanceof BaseNode) {
            this.insertAfter(node);
        }

        if (_.isNumber(index)) {
            this.index = index;
        }

        const _this = this;
        this._wrapper = {
            get index() {
                return _this.index;
            },
            set index(index) {
                return (_this.index = index);
            },
            get key() {
                return _this.key;
            },
            get value() {
                return _this.value;
            }
        };
    }

    /** @type {number} */
    get index() {
        return this._index;
    }

    get wrapper() {
        return this._wrapper;
    }

    set index(newIndex) {
        if (!_.isFinite(newIndex) || newIndex < 0) {
            throw new Error('position needs to be a positive finite number');
        }

        if (this._index === newIndex) {
            return;
        }

        const oldIndex = this._index || -1;
        this._index = newIndex;

        // > sweeps right
        // < sweeps left
        // pretty cool.
        if (newIndex > oldIndex) {
            this._sweepRight();
        } else if (newIndex < oldIndex) {
            this._sweepLeft();
            this.parent.emit('available');
        }

        return this._index;
    }

    remove() {
        const {
            prev,
            next
        } = this;

        if (this.prev) {
            this.prev.next = next;
        }

        if (this.next) {
            this.next.prev = prev;
        }

        this.prev = null;
        this.next = null;

        return this;
    }

    /**
     * 
     * @param {IndexedNode} node 
     */
    insertAfter(node) {
        this.prev = node;
        this.next = node.next;

        if (node.next) {
            node.next.prev = this;
        }

        node.next = this;

        return this;
    }

    _sweepLeft() {
        let current = this;
        while (current.prev && current.prev.index > this.index) {
            current = current.prev;
        }

        if (current !== this && current.prev) {
            this.remove().insertAfter(current.prev);
        }
    }

    _sweepRight() {
        let current = this;
        while (current.next && current.next.index <= this.index) {
            current = current.next;
        }

        if (current !== this) {
            this.remove().insertAfter(current);
        }
    }
}

module.exports = IndexedNode;