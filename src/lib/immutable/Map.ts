import Immutable from "immutable";
import { AsValueObject } from "./ImmutableJS";

export class Map<Key, Value> {
  private constructor(private immutableMap: Immutable.Map<AsValueObject<Key>, Value>) {}
  private serializeKey(key: Key): AsValueObject<Key> {
    return new AsValueObject(key);
  }
  private deserializeKey(key: AsValueObject<Key>): Key {
    return key.value;
  }
  static empty<Key, Value>() {
    return new Map<Key, Value>(Immutable.Map());
  }
  has(key: Key): boolean {
    return this.immutableMap.has(this.serializeKey(key));
  }
  get(key: Key): Value | undefined {
    return this.immutableMap.get(this.serializeKey(key));
  }
  set(key: Key, value: Value): Map<Key, Value> {
    return new Map(this.immutableMap.set(this.serializeKey(key), value));
  }
  del(key: Key): Map<Key, Value> {
    return new Map(this.immutableMap.remove(this.serializeKey(key)));
  }
  filter(criteria: (key: Key, value: Value) => boolean): Map<Key, Value> {
    return new Map(this.immutableMap.filter((value, key) => criteria(this.deserializeKey(key), value)));
  }
  mapValues(mapper: (key: Key, value: Value) => Value): Map<Key, Value> {
    return new Map(this.immutableMap.map((value, key) => mapper(this.deserializeKey(key), value)));
  }
  entries() {
    return Array.from(this.immutableMap.entries()).map(([key, value]) => [key.value, value] as const);
  }
}
