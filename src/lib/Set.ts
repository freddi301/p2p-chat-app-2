import Immutable from "immutable";

export class Set<Value> {
  private constructor(private immutableSet: Immutable.Set<any>) {}
  static empty<Value>() {
    return new Set<Value>(Immutable.Set());
  }
  has(value: Value): boolean {
    return this.immutableSet.has(Immutable.fromJS(value));
  }
  add(value: Value): Set<Value> {
    return new Set(this.immutableSet.add(Immutable.fromJS(value)));
  }
  del(value: Value): Set<Value> {
    return new Set(this.immutableSet.remove(Immutable.fromJS(value)));
  }
  filter(criteria: (value: Value) => boolean): Set<Value> {
    return new Set(this.immutableSet.filter(criteria));
  }
  toArray(): Array<Value> {
    return this.immutableSet.toArray().map((value) => Immutable.fromJS(value)) as any;
  }
}
