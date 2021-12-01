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
export type ToStateOfIncremental<I> = I extends Incremental<any, any, infer ToState, any> ? ToState : never;
export type ToActionOfIncremental<I> = I extends Incremental<any, any, any, infer ToAction> ? ToAction : never;

const upgrade = <FromState, FromAction, ToState, ToAction>(
  reducer: Reducer<FromState, FromAction>,
  state: FromState,
  incremental: Incremental<FromState, FromAction, ToState, ToAction>
): [Reducer<[FromState, ToState], FromAction>, [FromState, ToState]] => {
  return [
    ([fromState, toState], fromAction) => {
      const delta = incremental.delta(fromState, fromAction);
      return [reducer(fromState, fromAction), delta !== undefined ? incremental.reducer(toState, delta) : toState];
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
      return [reducer(fromState, fromAction), delta !== undefined ? incremental.reducer(toState, delta) : toState];
    },
    (state) => [state, incremental.mapper(state)],
  ];
};

const composeMany = <
  FromState,
  FromAction,
  Incrementals extends {
    [Key in keyof Incrementals]: Incremental<
      FromState,
      FromAction,
      ToStateOfIncremental<Incrementals[Key]>,
      ToActionOfIncremental<Incrementals[Key]>
    >;
  }
>(
  reducer: Reducer<FromState, FromAction>,
  incrementals: Incrementals
): [
  Reducer<[FromState, { [Key in keyof Incrementals]: ToStateOfIncremental<Incrementals[Key]> }], FromAction>,
  Mapper<FromState, [FromState, { [Key in keyof Incrementals]: ToStateOfIncremental<Incrementals[Key]> }]>
] => {
  return [
    ([fromState, toState], fromAction) => {
      return [
        reducer(fromState, fromAction),
        Object.fromEntries(
          Object.entries(incrementals).map(([key, incremental]) => {
            const delta = (incremental as any).delta(fromState, fromAction);
            return [key, delta ? (incremental as any).reducer(toState[key], delta) : toState[key]];
          })
        ) as any,
      ];
    },
    (state) => [
      state,
      Object.fromEntries(
        Object.entries(incrementals).map(([key, incremental]) => [key, (incremental as any).mapper(state)])
      ) as any,
    ],
  ];
};

export const Incremental = {
  upgrade,
  compose,
  composeMany,
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
