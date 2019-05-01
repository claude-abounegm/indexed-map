'use strict';

const _ = require('lodash');

const WeightedNode = require('./WeightedNode');
const RootNode = require('./RootNode');

class WeightedMap {
    constructor(maxWeight) {
        /** @type {WeightedNode} */
        this._root = new RootNode();
        /** @type {Map<any, WeightedNode>} */
        this._map = new Map();

        this.maxWeight = _.isFinite(maxWeight) ? maxWeight : Infinity;
    }

    get first() {
        const node = this._root.next;
        return node && node.wrapper;
    }

    get size() {
        return this._map.size;
    }

    next(weightIncrement = 1) {
        const node = this._root.next;

        if (node) {
            if (_.isNumber(weightIncrement)) {
                if (this.maxWeight < node.weight + weightIncrement) {
                    return;
                }

                node.weight += weightIncrement;
            }

            return node.wrapper;
        }
    }

    add(key, value, initialWeight = 0) {
        if (this.has(key)) {
            throw new Error(`found item with key: ${key}`);
        }

        const node = new WeightedNode(this, key, value, this._root, initialWeight);
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
        } catch { }
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
     * @param {WeightedNode} [root]
     * @returns {IterableIterator<WeightedNode>} 
     * @private
     */
    * _nodes(root) {
        let current = root || this._root;
        if (!current.isRoot) {
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

module.exports = WeightedMap;