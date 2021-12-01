import Immutable from "immutable";

export class Map<Key, Value> {
  private constructor(private immutableMap: Immutable.Map<any, Value>) {}
  static empty<Key, Value>() {
    return new Map<Key, Value>(Immutable.Map());
  }
  has(key: Key): boolean {
    return this.immutableMap.has(Immutable.fromJS(key));
  }
  get(key: Key): Value | undefined {
    return this.immutableMap.get(Immutable.fromJS(key));
  }
  set(key: Key, value: Value): Map<Key, Value> {
    return new Map(this.immutableMap.set(Immutable.fromJS(key), value));
  }
  del(key: Key): Map<Key, Value> {
    return new Map(this.immutableMap.remove(Immutable.fromJS(key)));
  }
  filter(criteria: (key: Key, value: Value) => boolean): Map<Key, Value> {
    return new Map(this.immutableMap.filter((value, key) => criteria(Immutable.fromJS(key) as any, value)));
  }
  mapValues(mapper: (key: Key, value: Value) => Value): Map<Key, Value> {
    return new Map(this.immutableMap.map((value, key) => mapper(Immutable.fromJS(key) as any, value)));
  }
}
