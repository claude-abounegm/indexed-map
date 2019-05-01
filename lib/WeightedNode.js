'use strict';

const _ = require('lodash');

const BaseNode = require('./BaseNode');

class WeightedNode extends BaseNode {
    constructor(map, key, value, node, weight) {
        super();

        this.map = map;

        /** @type {WeightedNode} */
        this.next = null;
        /** @type {WeightedNode} */
        this.prev = null;

        this.key = key;
        this.value = value;

        if (node instanceof BaseNode) {
            this.insertAfter(node);
        }

        if (_.isNumber(weight)) {
            this.weight = weight;
        }

        const _this = this;
        this._wrapper = {
            get weight() {
                return _this.weight;
            },
            set weight(weight) {
                return (_this.weight = weight);
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
    get weight() {
        return this._weight;
    }

    get wrapper() {
        return this._wrapper;
    }

    set weight(newWeight) {
        if (!_.isFinite(newWeight) || newWeight < 0 || newWeight > this.map.maxWeight) {
            throw new Error('position needs to be a positive finite number less than maxWeight');
        }

        if (this._weight === newWeight) {
            return;
        }

        const oldWeight = this._weight || -1;
        this._weight = newWeight;

        // > sweeps right
        // < sweeps left
        // pretty cool.
        if (newWeight > oldWeight) {
            this._sweepRight();
        } else if (newWeight < oldWeight) {
            this._sweepLeft();
        }

        return this._weight;
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
     * @param {WeightedNode} node 
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
        while (current.prev && current.prev.weight > this.weight) {
            current = current.prev;
        }

        if (current !== this && current.prev) {
            this.remove().insertAfter(current.prev);
        }
    }

    _sweepRight() {
        let current = this;
        while (current.next && current.next.weight <= this.weight) {
            current = current.next;
        }

        if (current !== this) {
            this.remove().insertAfter(current);
        }
    }
}

module.exports = WeightedNode;