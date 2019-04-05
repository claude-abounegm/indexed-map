interface KeyValuePair<K, V> {
    index: number;
    readonly key: K;
    readonly value: V;
}

declare class IndexedMap<K, V> {
    constructor(maxIndex?: number);

    readonly first: KeyValuePair<K, V> | undefined;
    readonly size: number;

    add(key: K, value: V, index?: number): IndexedMap<K, V>;
    update(key: K, value: V): IndexedMap<K, V>;
    clear(): IndexedMap<K, V>;

    pop(indexIncrement?: number): KeyValuePair<K, V> | undefined;
    get(key: K): KeyValuePair<K, V>;

    has(key: K): boolean;
    delete(key: K): boolean;

    entries(): IterableIterator<KeyValuePair<K, V>>;
    entries<T>(transform: (entry: KeyValuePair<K, V>) => T): IterableIterator<T>;

    entriesArray(): KeyValuePair<K, V>[];
    entriesArray<T>(transform: (entry: KeyValuePair<K, V>) => T): T[];
}

export = IndexedMap;