// https://github.com/kotarella1110/use-custom-compare/tree/master/src

import React, { EffectCallback, DependencyList } from "react";

export function useCustomCompareEffect<TDependencyList extends DependencyList>(
  effect: EffectCallback,
  deps: readonly [...TDependencyList],
  depsAreEqual: DepsAreEqual<readonly [...TDependencyList]>
) {
  // eslint-disable-next-line
  React.useEffect(effect, useCustomCompareMemoize(deps, depsAreEqual));
}

type DepsAreEqual<TDependencyList extends DependencyList> = (
  prevDeps: TDependencyList,
  nextDeps: TDependencyList
) => boolean;

function useCustomCompareMemoize<TDependencyList extends DependencyList>(
  deps: readonly [...TDependencyList],
  depsAreEqual: DepsAreEqual<readonly [...TDependencyList]>
) {
  const ref = React.useRef<readonly [...TDependencyList] | undefined>(undefined);
  if (!ref.current || !depsAreEqual(ref.current, deps)) {
    ref.current = deps;
  }
  return ref.current;
}
