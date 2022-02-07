import { Commands } from "../domain/commands";
import { Queries } from "../domain/queries";
import { actionCreators, reducer, State, stateSelectors } from "../domain/reducers";
import { Map } from "../lib/immutable/Map";
import { Store } from "../lib/reducer/Store";
import React from "react";
import { isEqual } from "lodash";
import { Timestamp } from "../domain/common/Timestamp";
import { AccountSecret } from "../domain/common/AccountSecret";
import { useCustomCompareEffect } from "./components/hooks/useCustomCompare";

const store = new Store(reducer, {
  contacts: Map.empty<any, any>(),
  accounts: Map.empty<any, any>(),
  directMessages: Map.empty<any, any>(),
});

function generateMockData() {
  const timestamp = Timestamp.now();
  const [fredId, fredSecret] = AccountSecret.create();
  commands.AccountUpdate({ id: fredId, timestamp, name: "Fred", description: "", secret: fredSecret });
  const [aliceId, aliceSecret] = AccountSecret.create();
  commands.AccountUpdate({
    id: aliceId,
    timestamp,
    name: "Alice",
    description: "",
    secret: aliceSecret,
  });
  commands.ContactUpdate({ owner: fredId, id: aliceId, timestamp, name: "Alice", description: "" });
  commands.ContactUpdate({ owner: aliceId, id: fredId, timestamp, name: "Fred", description: "" });
  commands.DirectMessageUpdate({
    timestamp,
    sender: fredId,
    recipient: aliceId,
    text: "Hello",
    createdAt: timestamp,
    attachments: [],
  });
}

export const commands: Commands = Object.fromEntries(
  Object.entries(actionCreators).map(([key, actionCreator]) => {
    return [key, (...args: any[]) => store.publish(actionCreator(...args))];
  })
) as any;

export const queries: Queries = Object.fromEntries(
  Object.entries(stateSelectors).map(([key, stateSelector]) => {
    return [
      key,
      (...args: any) => {
        const [selection, setSelection] = React.useState(stateSelector.bind(store.state)(...args));
        useCustomCompareEffect(
          () => {
            const onUpdate = (state: State) => setSelection(stateSelector.bind(state)(...args));
            store.subscribe(onUpdate);
            return () => store.unsubscribe(onUpdate);
          },
          args,
          isEqual
        );
        return selection;
      },
    ];
  })
) as any;

generateMockData();
