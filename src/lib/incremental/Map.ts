import { Reducer } from "../Reducer";
import { Map } from "../immutable/Map";
import type { Incremental } from ".";

type MapState<Key, Value> = Map<Key, Value>;
type MapAction<Key, Value> = { type: "set"; key: Key; value: Value } | { type: "remove"; key: Key };

export const makeMapReducer =
  <Key, Value>(): Reducer<MapState<Key, Value>, MapAction<Key, Value>> =>
  (state, action) => {
    switch (action.type) {
      case "set":
        return state.set(action.key, action.value);
      case "remove":
        return state.del(action.key);
    }
  };

export const makeFilteredMapIncremental = <Key, Value>(
  criteria: (key: Key, value: Value) => boolean
): Incremental<MapState<Key, Value>, MapAction<Key, Value>, MapState<Key, Value>, MapAction<Key, Value>> => ({
  mapper: (state) => state.filter(criteria),
  delta: (state, action) => {
    switch (action.type) {
      case "set": {
        const existing = state.get(action.key);
        if (existing !== undefined) {
          if (criteria(action.key, action.value)) return { type: "set", key: action.key, value: action.value };
          if (criteria(action.key, existing)) return { type: "remove", key: action.key };
        } else {
          if (criteria(action.key, action.value)) return { type: "set", key: action.key, value: action.value };
        }
        return undefined;
      }
      case "remove": {
        const existing = state.get(action.key);
        if (existing !== undefined && criteria(action.key, existing)) return { type: "remove", key: action.key };
        return undefined;
      }
    }
  },
  reducer: makeMapReducer<Key, Value>(),
});

export const makeValueMappedMapIncremental = <Key, Value>(
  mapper: (key: Key, value: Value) => Value
): Incremental<MapState<Key, Value>, MapAction<Key, Value>, MapState<Key, Value>, MapAction<Key, Value>> => ({
  mapper: (state) => state.mapValues(mapper),
  delta: (state, action) => {
    switch (action.type) {
      case "set": {
        return { type: "set", key: action.key, value: mapper(action.key, action.value) };
      }
      case "remove": {
        const existing = state.get(action.key);
        if (existing !== undefined) return { type: "remove", key: action.key };
        return undefined;
      }
    }
  },
  reducer: makeMapReducer<Key, Value>(),
});
