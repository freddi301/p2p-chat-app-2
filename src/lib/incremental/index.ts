import { Reducer } from "../Reducer";
import { Set } from "../immutable/Set";
import { makeSetReducer, makeFilteredSetIncremental } from "./Set";
import { makeFilteredMapIncremental, makeMapReducer, makeValueMappedMapIncremental } from "./Map";

export type Incremental<FromState, FromAction, ToState, ToAction> = {
  mapper: Mapper<FromState, ToState>;
  delta: Delta<FromState, FromAction, ToAction>;
  reducer: Reducer<ToState, ToAction>;
};
type Mapper<From, To> = (from: From) => To;
type Delta<FromState, FromAction, ToAction> = (fromStata: FromState, fromAction: FromAction) => ToAction | undefined;

const upgrade = <FromState, FromAction, ToState, ToAction>(
  reducer: Reducer<FromState, FromAction>,
  state: FromState,
  incremental: Incremental<FromState, FromAction, ToState, ToAction>
): [Reducer<[FromState, ToState], FromAction>, [FromState, ToState]] => {
  return [
    ([fromState, toState], fromAction) => {
      const delta = incremental.delta(fromState, fromAction);
      return [reducer(fromState, fromAction), delta ? incremental.reducer(toState, delta) : toState];
    },
    [state, incremental.mapper(state)],
  ];
};

const compose = <FromState, FromAction, ToState, ToAction>(
  reducer: Reducer<FromState, FromAction>,
  incremental: Incremental<FromState, FromAction, ToState, ToAction>
): [Reducer<[FromState, ToState], FromAction>, Mapper<FromState, [FromState, ToState]>] => {
  return [
    ([fromState, toState], fromAction) => {
      const delta = incremental.delta(fromState, fromAction);
      return [reducer(fromState, fromAction), delta ? incremental.reducer(toState, delta) : toState];
    },
    (state) => [state, incremental.mapper(state)],
  ];
};

export const Incremental = {
  upgrade,
  compose,
  Set: {
    subject: <Value>() => makeSetReducer<Value>(),
    filter: <Value>(criteria: (value: Value) => boolean) => makeFilteredSetIncremental<Value>(criteria),
  },
  Map: {
    subject: <Key, Value>() => makeMapReducer<Key, Value>(),
    filter: <Key, Value>(criteria: (key: Key, value: Value) => boolean) =>
      makeFilteredMapIncremental<Key, Value>(criteria),
    mapValues: <Key, Value>(mapper: (key: Key, value: Value) => Value) =>
      makeValueMappedMapIncremental<Key, Value>(mapper),
  },
};

// Example usage

const initial = Set.empty<string>().add("frederik");
const criteria = (name: string) => name.startsWith("f");

let [reducer, mapper] = Incremental.compose(Incremental.Set.subject<string>(), Incremental.Set.filter(criteria));
let state = mapper(initial);

[reducer, state] = Incremental.upgrade(Incremental.Set.subject<string>(), initial, Incremental.Set.filter(criteria));

console.log(state.map((s) => s.toArray()));

state = reducer(state, { type: "add", value: "alice" });

console.log(state.map((s) => s.toArray()));

state = reducer(state, { type: "remove", value: "frederik" });

console.log(state.map((s) => s.toArray()));
