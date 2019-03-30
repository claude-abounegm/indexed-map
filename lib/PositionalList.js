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

    set(key, value, position = 0) {
        let node = this.map.get(key);
        if (node) {
            if (typeof value !== 'undefined') {
                node.value = value;
            }

            node.position = position;
        } else {
            if (typeof value === 'undefined') {
                throw new Error('value should not be undefined');
            }

            this.map.set(key, new PositationalNode(value, position, this.head));
        }

        return this;
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

    * nodes(head) {
        let current = head || this.head;
        yield current;
        while (current.next) {
            current = current.next;
            yield current;
        }
    }

    toArray(head) {
        const nodes = [];
        for (const node of this.nodes(head)) {
            nodes.push(node);
        }
        return nodes;
    }
}

module.exports = PositionalList;