import React from "react";
import { useNavigationStack } from "./useNavigationStack";
import { useTransitionate } from "./useTransitionate";
import { Routing } from "../App";

export function useRoutingWithAnimation(Screen: React.ComponentType<{ routing: Routing }>) {
  const [content, next] = useTransitionate();
  const { push, pop } = useNavigationStack<Routing>(root, {
    onPush(routing) {
      next("right", <Screen routing={routing} />);
    },
    onPop(routing) {
      next("left", <Screen routing={routing} />);
    },
  });
  React.useLayoutEffect(() => {
    next("stay", <Screen routing={root} />);
  }, [Screen, next]);
  return <RoutingContext.Provider value={{ push, pop }}>{content}</RoutingContext.Provider>;
}

const root: Routing = { screen: "home" };

type RoutingContextValue = {
  push(next: Routing): void;
  pop(): void;
};

export const RoutingContext = React.createContext<RoutingContextValue>(null as any);
