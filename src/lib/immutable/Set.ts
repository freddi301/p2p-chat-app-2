import Immutable from "immutable";
import { AsValueObject } from "./ImmutableJS";

export class Set<Value> {
  private constructor(private immutableSet: Immutable.Set<AsValueObject<Value>>) {}
  private serializeValue(value: Value): AsValueObject<Value> {
    return new AsValueObject(value);
  }
  private deserializeValue(value: AsValueObject<Value>): Value {
    return value.value;
  }
  static empty<Value>() {
    return new Set<Value>(Immutable.Set());
  }
  has(value: Value): boolean {
    return this.immutableSet.has(this.serializeValue(value));
  }
  add(value: Value): Set<Value> {
    return new Set(this.immutableSet.add(this.serializeValue(value)));
  }
  del(value: Value): Set<Value> {
    return new Set(this.immutableSet.remove(this.serializeValue(value)));
  }
  filter(criteria: (value: Value) => boolean): Set<Value> {
    return new Set(this.immutableSet.filter((value) => criteria(this.deserializeValue(value))));
  }
  toArray(): Array<Value> {
    return this.immutableSet.toArray().map((value) => this.deserializeValue(value));
  }
}
