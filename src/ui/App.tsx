import React from "react";
import { css } from "styled-components/macro";
import { Button } from "./components/base/Button";
import { StyleProvider } from "./components/style/StyleProvider";
import { RoutingContext, useRoutingWithAnimation } from "./components/routing/useRoutingWithAnimation";
import { Routing } from "./Routing";
import { AccountListScreen } from "./screens/AccountListScreen";

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

type ScreeProps = { routing: Routing };
function Screen({ routing }: ScreeProps) {
  const { push, pop } = React.useContext(RoutingContext);
  switch (routing.screen) {
    case "account-list":
      return <AccountListScreen />;
  }
  return (
    <div>
      <Button label="next" onClick={() => push({ screen: "account-list" })} />
      <Button label="prev" onClick={() => pop()} />
    </div>
  );
}
