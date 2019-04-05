interface KeyValuePair<V, K> {
    index: number;
    readonly key: K;
    readonly value: V;
}

declare class PriorityMap<V, K = string> {
    constructor();

    readonly first: V;
    readonly size: number;

    add(key: K, value: V, index?: number): PriorityMap<V, K>;
    update(key: K, value: V): PriorityMap<V, K>;
    clear(): PriorityMap<V, K>;

    delete(key: K): boolean;

    get(key: K): KeyValuePair<V, K>;

    entries(): IterableIterator<KeyValuePair<V, K>>;
    entries<T>(transform: (entry: KeyValuePair<V, K>) => T): IterableIterator<T>;

    entriesArray(): KeyValuePair<V, K>[];
    entriesArray<T>(transform: (entry: KeyValuePair<V, K>) => T): T[];
}

export = PriorityMap;