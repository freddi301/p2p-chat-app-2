import { Reducer } from "../lib/reducer";

type Capsule<
  State,
  Action,
  ActionCreators extends Record<string, (...args: any[]) => Action>,
  StateSelectors extends (state: State) => Record<string, (...args: any[]) => any>
> = {
  command: {
    [Key in keyof ActionCreators]: (
      ...args: Parameters<ActionCreators[Key]>
    ) => Capsule<State, Action, ActionCreators, StateSelectors>;
  };
  query: {
    [Key in keyof ReturnType<StateSelectors>]: (
      ...args: Parameters<ReturnType<StateSelectors>[Key]>
    ) => ReturnType<ReturnType<StateSelectors>[Key]>;
  };
};

function makeCapsule<
  State,
  Action,
  ActionCreators extends Record<string, (...args: any[]) => Action>,
  StateSelectors extends (state: State) => Record<string, (...args: any[]) => any>
>(
  reducer: Reducer<State, Action>,
  actionCreators: ActionCreators,
  stateSelectors: StateSelectors,
  state: State
): Capsule<State, Action, ActionCreators, StateSelectors> {
  return {
    command: Object.fromEntries(
      Object.entries(actionCreators).map(([key, actionCreator]) => {
        return [
          key,
          (...args: any[]) =>
            makeCapsule(reducer, actionCreators, stateSelectors, reducer(state, actionCreator(...args))),
        ] as const;
      })
    ) as any,
    query: Object.fromEntries(
      Object.entries(stateSelectors(state)).map(([key, stateSelector]) => {
        return [key, (...args: any[]) => stateSelector(...args)];
      })
    ) as any,
  };
}
