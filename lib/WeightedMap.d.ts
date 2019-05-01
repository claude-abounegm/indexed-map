interface WeightedKeyValuePair<K, V> {
    weight: number;
    readonly key: K;
    readonly value: V;
}

declare class WeightedMap<K, V> {
    constructor(maxWeight?: number);

    readonly first: WeightedKeyValuePair<K, V> | undefined;
    readonly size: number;

    clear(): WeightedMap<K, V>;

    has(key: K): boolean;
    get(key: K): WeightedKeyValuePair<K, V>;

    add(key: K, value: V, initialWeight?: number): WeightedKeyValuePair<K, V>;
    update(key: K, value: V): WeightedKeyValuePair<K, V>;
    delete(key: K): WeightedKeyValuePair<K, V> | undefined;

    next(weightIncrement?: number): WeightedKeyValuePair<K, V> | undefined;

    entries(): IterableIterator<WeightedKeyValuePair<K, V>>;
    entries<T>(transform: (entry: WeightedKeyValuePair<K, V>) => T): IterableIterator<T>;

    entriesArray(): WeightedKeyValuePair<K, V>[];
    entriesArray<T>(transform: (entry: WeightedKeyValuePair<K, V>) => T): T[];
}

export = WeightedMap;