import Immutable from "immutable";

export class Set<Value> {
  private constructor(private immutableSet: Immutable.Set<unknown>) {}
  private serializeValue(value: Value): Immutable.Collection<unknown, unknown> {
    return Immutable.fromJS(value);
  }
  private deserializeValue(value: Immutable.Collection<unknown, unknown>): Value {
    return Immutable.isCollection(value) ? value.toJS() : (value as any);
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
    return new Set(this.immutableSet.filter((value) => criteria(this.deserializeValue(value as any))));
  }
  toArray(): Array<Value> {
    return this.immutableSet.toArray().map((value) => this.serializeValue(value as any)) as any;
  }
}
