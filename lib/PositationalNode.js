'use strict';

const _ = require('lodash');

class PositationalNode {
    constructor(value, node, position) {
        /** @type {PositationalNode} */
        this.next = null;
        /** @type {PositationalNode} */
        this.prev = null;

        this.value = value;

        if (node instanceof PositationalNode) {
            this.insertAfter(node);
        }

        if (_.isNumber(position)) {
            this.position = position;
        }
    }

    /** @type {number} */
    get position() {
        return this._position;
    }

    set position(value) {
        if (!_.isFinite(value) || value < 0) {
            throw new Error('position needs to be a finite number');
        }

        if (this._position === value) {
            return;
        }

        const oldValue = this._position || -1;
        this._position = value;

        if (value > oldValue) {
            this._sweepRight();
        } else if (value < oldValue) {
            this._sweepLeft();
        }
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
     * @param {PositationalNode} node 
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
        while (current.prev && current.prev.position > this.position) {
            current = current.prev;
        }

        if (current !== this && current.prev) {
            this.remove().insertAfter(current.prev);
            return true;
        }

        return false;
    }

    _sweepRight() {
        let current = this;
        while (current.next && current.next.position <= this.position) {
            current = current.next;
        }

        if (current !== this) {
            this.remove().insertAfter(current);
            return true;
        }

        return false;
    }
}

module.exports = PositationalNode;