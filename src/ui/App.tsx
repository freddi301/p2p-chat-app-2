import React from "react";
import { css } from "styled-components/macro";
import { Button } from "./components/base/Button";
import { StyleProvider } from "./components/style/StyleProvider";
import { RoutingContext, useRoutingWithAnimation } from "./components/routing/useRoutingWithAnimation";
import { Routing } from "./Routing";
import { AccountListScreen } from "./screens/AccountListScreen";
import { AccountCreateScreen } from "./screens/AccountCreateScreen";
import { AccountScreen } from "./screens/AccountScreen";

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
  const { pop } = React.useContext(RoutingContext);
  switch (routing.screen) {
    case "account-list":
      return <AccountListScreen />;
    case "account-create":
      return <AccountCreateScreen />;
    case "account":
      return <AccountScreen id={routing.id} />;
  }
  return (
    <div>
      <Button label="prev" onClick={() => pop()} />
      <pre>{JSON.stringify(routing, null, 2)}</pre>
    </div>
  );
}
