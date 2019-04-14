'use strict';

const _ = require('lodash');

const IndexedNode = require('./IndexedNode');
const RootNode = require('./RootNode');

class IndexedMap {
    constructor(maxIndex) {
        /** @type {IndexedNode} */
        this._root = new RootNode();
        /** @type {Map<any, IndexedNode>} */
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
                if (this.maxIndex < node.index + indexIncrement) {
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
        if (this.has(key)) {
            throw new Error(`found item with key: ${key}`);
        }

        const node = new IndexedNode(key, value, this._root, index);
        this._map.set(key, node);
        return node.wrapper;
    }

    update(key, value) {
        const node = this._get(key);
        node.value = value;
        return node.wrapper;
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
            return node.wrapper;
        } catch {}
    }

    get(key) {
        return this._get(key).wrapper;
    }

    has(key) {
        return this._map.has(key);
    }

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

    entriesArray(transform) {
        const entries = [];
        for (const entry of this.entries(transform)) {
            entries.push(entry);
        }

        return entries;
    }

    /**
     * 
     * @param {IndexedNode} [root]
     * @returns {IterableIterator<IndexedNode>} 
     * @private
     */
    * _nodes(root) {
        let current = root || this._root;
        if(!current.isRoot) {
            yield current;
        }

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