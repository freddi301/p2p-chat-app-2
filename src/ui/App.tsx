import React from "react";
import { css } from "styled-components/macro";
import { Button } from "./components/base/Button";
import { StyleProvider } from "./components/StyleProvider";
import { RoutingContext, useRoutingWithAnimation } from "./components/useRoutingWithAnimation";

export function App() {
  const children = useRoutingWithAnimation(Screen);
  return (
    <StyleProvider>
      <div
        css={css`
          width: 100vw;
          height: 100vh;
        `}
      >
        {children}
      </div>
    </StyleProvider>
  );
}

export type Routing = { screen: "home" };

type ScreeProps = { routing: Routing };
function Screen({ routing }: ScreeProps) {
  const { push, pop } = React.useContext(RoutingContext);
  return (
    <div>
      <Button label="next" onClick={() => push({ screen: "home" })} />
      <Button label="prev" onClick={() => pop()} />
    </div>
  );
}
