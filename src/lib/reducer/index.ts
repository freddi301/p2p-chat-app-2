export type Reducer<State, Action> = (state: State, action: Action) => State;
export type StateOfReducer<R> = R extends Reducer<infer State, any> ? State : never;
export type ActionOfReducer<R> = R extends Reducer<any, infer Action> ? Action : never;
