'use strict';

const _ = require('lodash');
const PositationalNode = require('./PositationalNode');
const HeadNode = require('./HeadNode');

class PositionalList {
    constructor() {
        /** @type {PositationalNode} */
        this.head = new HeadNode();
        /** @type {Map<string, PositationalNode>} */
        this.map = new Map();
    }

    /**
     * 
     * @param {string} key 
     * @param {*} value 
     * @param {number} [position] 
     */
    set(key, value, position = 0) {
        let node = this.map.get(key);
        if (node) {
            if (!_.isUndefined(value)) {
                node.value = value;
            }

            node.position = position;
        } else {
            if (_.isUndefined(value)) {
                throw new Error('value should not be undefined');
            }

            this.map.set(key, new PositationalNode(value, this.head, position));
        }

        return this;
    }

    get(key) {
        const node = this._getNode(key);
        return node && node.value;
    }

    get first() {
        const node = this._firstNode;
        return node && node.value;
    }

    get last() {
        const node = this._lastNode;
        return node && node.value;
    }

    /**
     * @returns {any[]}
     */
    toArray() {
        const nodes = [];
        for (const node of this._nodes()) {
            nodes.push(node.value);
        }

        return nodes;
    }

    /**
     * 
     * @param {string} key 
     */
    _getNode(key) {
        return this.map.get(key);
    }

    get _firstNode() {
        return this.head.next;
    }

    get _lastNode() {
        let current;
        for (const node of this._nodes()) {
            current = node;
        }

        return current && current.value;
    }

    /**
     * 
     * @param {PositationalNode} [head]
     * @returns {IterableIterator<PositationalNode>} 
     */
    * _nodes(head) {
        let current = head || this.head;
        while (current.next) {
            current = current.next;
            yield current;
        }
    }
}

module.exports = PositionalList;