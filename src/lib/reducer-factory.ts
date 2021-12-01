import { ActionOfReducer, Reducer, StateOfReducer } from "./Reducer";
import { isEqual } from "lodash";
import { Map } from "./immutable/Map";

export function makeCombinedReducer<
  Entries extends { [Key in keyof Entries]: Reducer<StateOfReducer<Entries[Key]>, ActionOfReducer<Entries[Key]>> }
>(
  entries: Entries
): Reducer<
  { [Key in keyof Entries]: StateOfReducer<Entries[Key]> },
  { [Key in keyof Entries]: { key: Key; action: ActionOfReducer<Entries[Key]> } }[keyof Entries]
> {
  return (state, action) => {
    return { ...state, [action.key]: entries[action.key](state[action.key], action.action) };
  };
}

export function makeKeyedReducer<Key, State, Action>(
  reducer: Reducer<State, Action>,
  initial: State
): Reducer<Map<Key, State>, { key: Key; action: Action }> {
  return (state, action) => {
    const nextState = reducer(state.get(action.key) ?? initial, action.action);
    if (isEqual(nextState, initial)) return state.del(action.key);
    return state.set(action.key, nextState);
  };
}
