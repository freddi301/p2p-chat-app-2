import React from "react";

export function useNavigationStack<NavigationState>(
  rootState: NavigationState,
  { onPush, onPop }: { onPush(next: NavigationState): void; onPop(prev: NavigationState): void }
) {
  const [state, setState] = React.useState<{ stack: Array<NavigationState> }>({ stack: [rootState] });
  const current = state.stack[state.stack.length - 1] as NavigationState;
  const push = React.useCallback(
    (next: NavigationState) => {
      setState((state) => {
        onPush(next);
        return { stack: [...state.stack, next] };
      });
    },
    [onPush]
  );
  const pop = React.useCallback(() => {
    setState((state) => {
      if (state.stack.length > 1) {
        onPop(state.stack[state.stack.length - 2] as NavigationState);
        return { stack: state.stack.slice(0, -1) };
      } else {
        return state;
      }
    });
  }, [onPop]);
  return { push, pop, current };
}

// eslint-disable-next-line react-hooks/exhaustive-deps
