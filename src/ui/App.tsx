import React from "react";
import { css } from "styled-components/macro";
import { StyleProvider } from "./components/style/StyleProvider";
import { useRoutingWithAnimation } from "./components/routing/useRoutingWithAnimation";
import { Routing } from "./Routing";
import { AccountListScreen } from "./screens/AccountListScreen";
import { AccountCreateScreen } from "./screens/AccountCreateScreen";
import { AccountScreen } from "./screens/AccountScreen";
import { ContactListScreen } from "./screens/ContactListScreen";
import { ContactCreateScreen } from "./screens/ContactCreateScreen";
import { ContactScreen } from "./screens/ContactScreen";
import { PostListScreen } from "./screens/PostListScreen";
import { PostFeedListScreen } from "./screens/PostFeedListScreen";
import { ConversationListScreen } from "./screens/ConversationListScreen";
import { HeaderContentControlsLayout } from "./components/reusable/HeaderContentControlsLayout";
import { SimpleHeader } from "./components/reusable/SimpleHeader";
import { ConversationScreen } from "./screens/ConversationScreen";

export function App() {
  const children = useRoutingWithAnimation(ScreenMemo);
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
  switch (routing.screen) {
    case "account-list":
      return <AccountListScreen />;
    case "account-create":
      return <AccountCreateScreen />;
    case "account":
      return <AccountScreen id={routing.id} />;
    case "contact-list":
      return <ContactListScreen owner={routing.owner} />;
    case "contact-create":
      return <ContactCreateScreen owner={routing.owner} />;
    case "contact":
      return <ContactScreen owner={routing.owner} id={routing.id} />;
    case "conversation-list":
      return <ConversationListScreen owner={routing.owner} />;
    case "conversation":
      return <ConversationScreen owner={routing.owner} other={routing.other} />;
    case "post-list":
      return <PostListScreen viewer={routing.viewer} author={routing.author} />;
    case "post-feed-list":
      return <PostFeedListScreen owner={routing.owner} />;
  }
  return (
    <HeaderContentControlsLayout
      header={<SimpleHeader>Not implemented</SimpleHeader>}
      content={<pre>{JSON.stringify(routing, null, 2)}</pre>}
      controls={null}
    />
  );
}
const ScreenMemo = React.memo(Screen);
