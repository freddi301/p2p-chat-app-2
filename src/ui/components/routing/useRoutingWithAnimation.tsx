import React from "react";
import { useNavigationStack } from "./useNavigationStack";
import { useTransitionate } from "./useTransitionate";
import { Routing } from "../../Routing";

export function useRoutingWithAnimation(Screen: React.ComponentType<{ routing: Routing }>) {
  const [content, next] = useTransitionate();
  const { push, pop } = useNavigationStack<Routing>(
    root,
    React.useMemo(() => {
      return {
        onPush(routing) {
          next("right", <Screen routing={routing} />);
        },
        onPop(routing) {
          next("left", <Screen routing={routing} />);
        },
      };
    }, [Screen, next])
  );
  React.useLayoutEffect(() => {
    next("stay", <Screen routing={root} />);
  }, [Screen, next]);
  const value = React.useMemo(() => ({ push, pop }), [pop, push]);
  return <RoutingContext.Provider value={value}>{content}</RoutingContext.Provider>;
}

const root: Routing = { screen: "account-list" };

type RoutingContextValue = {
  push(next: Routing): void;
  pop(): void;
};

export const RoutingContext = React.createContext<RoutingContextValue>(null as any);
