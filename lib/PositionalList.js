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
     * @returns {PositationalNode}
     */
    add(key, value, position = 0) {
        if (!_.isString(key)) {
            throw new Error('key should be a string');
        }

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

            node = new PositationalNode(key, value, this.head, position);
            this.map.set(key, node);
        }

        return node;
    }

    delete(key) {
        const node = this.get(key);
        if (node) {
            node.remove();
            this.map.delete(key);
            return true;
        }

        return false;
    }

    /**
     * 
     * @param {string} key 
     */
    get(key) {
        return this.map.get(key);
    }

    get first() {
        return this.head.next;
    }

    get last() {
        let current;
        for (const node of this.nodes()) {
            current = node;
        }

        return current;
    }

    /**
     * 
     * @param {PositationalNode} [head]
     * @returns {IterableIterator<PositationalNode>} 
     */
    * nodes(head) {
        let current = head || this.head;
        while (current.next) {
            current = current.next;
            yield current;
        }
    }

    /**
     * @template T
     * @param {(value) => T} [transform]
     * @returns {(T|PositationalNode)[]}
     */
    toArray(transform) {
        if (transform && !_.isFunction(transform)) {
            throw new Error('transform should be a function');
        }

        const values = [];
        for (let value of this.nodes()) {
            if (transform) {
                value = transform(value);
            }

            values.push(value);
        }

        return values;
    }
}

module.exports = PositionalList;