'use strict';

const _ = require('lodash');

const PriorityNode = require('./PriorityNode');
const NodeWrapper = require('./NodeWrapper');
const RootNode = require('./RootNode');

class PriorityMap {
    constructor() {
        /** @type {PriorityNode} */
        this._root = new RootNode();
        /** @type {Map<string, PriorityNode>} */
        this._map = new Map();
    }

    get first() {
        const node = this._root.next;
        return node && node.value;
    }

    /**
     * 
     * @param {string} key 
     * @param {*} value 
     * @param {number} [index] 
     * @returns {void}
     */
    add(key, value, index = 0) {
        if (!_.isString(key)) {
            throw new Error('key should be a string');
        }

        if (this._map.has(key)) {
            throw new Error(`found item with key: ${key}`);
        }

        this._map.set(key, new PriorityNode(key, value, this._root, index));
        return this;
    }

    update(key, value) {
        const node = this._get(key);
        node.value = value;
        return this;
    }

    delete(key) {
        try {
            const node = this._get(key);
            node.remove();
            this._map.delete(key);
            return true;
        } catch {
            return false;
        }
    }

    get(key) {
        return this._get(key).wrapper;
    }

    /**
     * @template T
     * @param {(value: NodeWrapper) => T} [transform]
     * @returns {(NodeWrapper | T)[]}
     */
    entriesArray(transform) {
        const entries = [];
        for(const entry of this.entries(transform)) {
            entries.push(entry);
        }

        return entries;
    }

    /**
     * @template T
     * @param {(value: NodeWrapper) => T} [transform]
     * @returns {IterableIterator<NodeWrapper | T>}
     */
    * entries(transform) {
        if (transform && !_.isFunction(transform)) {
            throw new Error('transform should be a function');
        }

        for (let { wrapper: value } of this._nodes()) {
            if (transform) {
                value = transform(value);
            }

            yield value;
        }
    }

    /**
     * 
     * @param {PositationalNode} [head]
     * @returns {IterableIterator<PositationalNode>} 
     * @private
     */
    * _nodes(head) {
        let current = head || this._root;
        while (current.next) {
            current = current.next;
            yield current;
        }
    }

    /**
     * 
     * @param {string} key 
     * @private
     */
    _get(key) {
        if (!this._map.has(key)) {
            throw new Error('cannot find item with specified key');
        }

        return this._map.get(key);
    }
}

module.exports = PriorityMap;