import { Reducer } from "./index";

export class Store<State, Action> {
  constructor(private reducer: Reducer<State, Action>, public state: State) {}
  listeners = new Set<(state: State) => void>();
  publish(action: Action) {
    this.state = this.reducer(this.state, action);
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
  subscribe(listener: (state: State) => void) {
    this.listeners.add(listener);
    listener(this.state);
  }
  unsubscribe(listener: (state: State) => void) {
    this.listeners.delete(listener);
  }
}
