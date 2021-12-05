export type Reducer<State, Action> = (state: State, action: Action) => State;
export type StateOfReducer<R> = R extends Reducer<infer State, any> ? State : never;
export type ActionOfReducer<R> = R extends Reducer<any, infer Action> ? Action : never;

export type ActionCreatorsFromCommnads<Action, Commands extends Record<string, (...args: any) => void>> = {
  [Key in keyof Commands]: (...args: Parameters<Commands[Key]>) => Action;
};

export type StateSelectorsFromQueries<State, Queries extends Record<string, (...args: any[]) => any>> = {
  [Key in keyof Queries]: (this: State, ...args: Parameters<Queries[Key]>) => ReturnType<Queries[Key]>;
};
