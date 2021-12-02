import React from "react";

export function useNavigationStack<NavigationState>(
  rootState: NavigationState,
  { onPush, onPop }: { onPush(next: NavigationState): void; onPop(prev: NavigationState): void }
) {
  const [state, setState] = React.useState<{ stack: Array<NavigationState> }>({ stack: [rootState] });
  const current = state.stack[state.stack.length - 1] as NavigationState;
  const push = (next: NavigationState) => {
    setState({ stack: [...state.stack, next] });
    onPush(next);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pop = () => {
    setState({ stack: state.stack.length > 1 ? state.stack.slice(0, -1) : state.stack });
    if (state.stack.length > 1) onPop(state.stack[state.stack.length - 1] as NavigationState);
  };
  React.useLayoutEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") pop();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [pop]);
  return { push, pop, current };
}
