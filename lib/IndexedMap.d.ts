interface KeyValuePair<K, V> {
    index: number;
    readonly key: K;
    readonly value: V;
}

declare class IndexedMap<K, V> {
    constructor(maxIndex?: number);

    readonly first: KeyValuePair<K, V> | undefined;
    readonly size: number;

    clear(): IndexedMap<K, V>;

    has(key: K): boolean;
    get(key: K): KeyValuePair<K, V>;

    add(key: K, value: V, index?: number): KeyValuePair<K, V>;
    update(key: K, value: V): KeyValuePair<K, V>;
    delete(key: K): KeyValuePair<K, V> | undefined;

    pop(indexIncrement?: number): KeyValuePair<K, V> | undefined;

    entries(): IterableIterator<KeyValuePair<K, V>>;
    entries<T>(transform: (entry: KeyValuePair<K, V>) => T): IterableIterator<T>;

    entriesArray(): KeyValuePair<K, V>[];
    entriesArray<T>(transform: (entry: KeyValuePair<K, V>) => T): T[];
}

export = IndexedMap;