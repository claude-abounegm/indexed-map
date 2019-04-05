'use strict';

const _ = require('lodash');

const { EventEmitter } = require('events');
const PriorityNode = require('./IndexedNode');
const RootNode = require('./RootNode');

class IndexedMap extends EventEmitter {
    constructor(maxIndex) {
        /** @type {PriorityNode} */
        this._root = new RootNode();
        /** @type {Map<any, PriorityNode>} */
        this._map = new Map();

        this.maxIndex = _.isFinite(maxIndex) ? maxIndex : Infinity;
    }

    get first() {
        const node = this._root.next;
        return node && node.wrapper;
    }

    get size() {
        return this._map.size;
    }

    pop(indexIncrement = 1) {
        const node = this._root.next;

        if (node) {
            if (_.isNumber(indexIncrement)) {
                if(this.maxIndex < node.index + indexIncrement) {
                    return;
                }

                node.index += indexIncrement;
            }

            return node.wrapper;
        }
    }

    /**
     * 
     * @param {*} key 
     * @param {*} value 
     * @param {number} [index] 
     */
    add(key, value, index = 0) {
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

    clear() {
        this._root = new RootNode();
        this._map.clear();
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

    has(key) {
        return this._map.has(key);
    }

    /**
     * @template T
     * @param {(value) => T} [transform]
     * @returns {IterableIterator<T>}
     */
    * entries(transform) {
        if (transform && !_.isFunction(transform)) {
            throw new Error('transform should be a function');
        }

        for (let {
                wrapper: value
            } of this._nodes()) {
            if (transform) {
                value = transform(value);
            }

            yield value;
        }
    }

    /**
     * @template T
     * @param {(value) => T} [transform]
     * @returns {T[]}
     */
    entriesArray(transform) {
        const entries = [];
        for (const entry of this.entries(transform)) {
            entries.push(entry);
        }

        return entries;
    }

    /**
     * 
     * @param {PriorityNode} [root]
     * @returns {IterableIterator<PriorityNode>} 
     * @private
     */
    * _nodes(root) {
        let current = root || this._root;
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

module.exports = IndexedMap;