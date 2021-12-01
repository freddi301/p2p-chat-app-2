import { Reducer } from "../Reducer";
import { Set } from "../immutable/Set";
import type { Incremental } from ".";

type SetState<Value> = Set<Value>;
type SetAction<Value> = { type: "add"; value: Value } | { type: "remove"; value: Value };

export const makeSetReducer =
  <Value>(): Reducer<SetState<Value>, SetAction<Value>> =>
  (state, action) => {
    switch (action.type) {
      case "add":
        return state.add(action.value);
      case "remove":
        return state.del(action.value);
    }
  };

export const makeFilteredSetIncremental = <Value>(
  criteria: (value: Value) => boolean
): Incremental<SetState<Value>, SetAction<Value>, SetState<Value>, SetAction<Value>> => ({
  mapper: (state) => state.filter(criteria),
  delta: (state, action) => {
    switch (action.type) {
      case "add": {
        if (!state.has(action.value) && criteria(action.value)) return { type: "add", value: action.value };
        return undefined;
      }
      case "remove": {
        if (state.has(action.value) && criteria(action.value)) return { type: "remove", value: action.value };
        return undefined;
      }
    }
  },
  reducer: makeSetReducer<Value>(),
});
