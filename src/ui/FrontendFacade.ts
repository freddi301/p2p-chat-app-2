import { Commands } from "../domain/commands";
import { Queries } from "../domain/queries";
import { actionCreators, reducer, State, stateSelectors } from "../domain/reducer";
import { Map } from "../lib/immutable/Map";
import { Store } from "../lib/reducer/Store";
import React from "react";
import { isEqual } from "lodash";

const store = new Store(reducer, { contacts: Map.empty<any, any>(), accounts: Map.empty<any, any>() });

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
        const lastArgs = React.useRef(args);
        React.useEffect(() => {
          if (!isEqual(args, lastArgs.current)) {
            lastArgs.current = args;
            const onUpdate = (state: State) => setSelection(stateSelector.bind(state)(...args));
            store.subscribe(onUpdate);
            return () => store.unsubscribe(onUpdate);
          }
          return;
        }, [args]);
        return selection;
      },
    ];
  })
) as any;

/*
export const queries: Queries = {
  AccountListSize() {
    return 1000;
  },
  AccountListAtIndex({ index }) {
    return makeFakeAccountId(index);
  },
  AccountById({ id }) {
    return {
      name: "Name" + id.toHex(),
      description: "Description" + id.toHex(),
    };
  },
  ContactListSize() {
    return 1000;
  },
  ContactListAtIndex({ index }) {
    return makeFakeAccountId(index);
  },
  ContactById({ id }) {
    return {
      name: "Name" + id.toHex(),
      description: "Description" + id.toHex(),
    };
  },
  ConversationListSize({ owner }) {
    return 1000;
  },
  ConversationListAtIndex({ owner, index }) {
    const other = makeFakeAccountId(index);
    const fakeId = new Array(32).fill(index);
    const fileId = FileId.fromUint8Array(Uint8Array.from(fakeId));
    return {
      other,
      lastMessage: {
        sender: owner,
        recipient: other,
        createdAt: sameCreatedAt.inc(index),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nVestibulum nisi ipsum, aliquet rhoncus gravida hendrerit, ornare quis nisl.",
        attachments: new Array(index).fill({ name: "file", id: fileId }),
      },
    };
  },
  ConversationSize({ owner, other }) {
    return 100000;
  },
  ConversationAtIndex({ owner, other, index }) {
    return {
      sender: owner,
      recipient: other,
      createdAt: sameCreatedAt.inc(index),
    };
  },
  DirectMessageById({ sender, recipient, createdAt }) {
    const fakeId = new Array(32).fill(0);
    const fileId = FileId.fromUint8Array(Uint8Array.from(fakeId));
    return {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nisi ipsum, aliquet rhoncus gravida hendrerit, ornare quis nisl. Aliquam ornare sagittis mi a pellentesque. Aenean non ipsum nibh. Donec ac leo sapien. Phasellus at libero sed felis sodales ornare. Duis in commodo orci. Cras ullamcorper efficitur auctor. Nulla nec erat finibus, feugiat diam vel, accumsan quam. Sed quis tempus arcu.".slice(
        0,
        createdAt.toDate().getTime() % 100
      ),
      attachments: [
        { name: "veryloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong.pdf", id: fileId },
        { name: "file.txt", id: fileId },
      ],
    };
  },
  PostById({ author, createdAt }) {
    return {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nisi ipsum, aliquet rhoncus gravida hendrerit, ornare quis nisl. Aliquam ornare sagittis mi a pellentesque. Aenean non ipsum nibh. Donec ac leo sapien. Phasellus at libero sed felis sodales ornare. Duis in commodo orci. Cras ullamcorper efficitur auctor. Nulla nec erat finibus, feugiat diam vel, accumsan quam. Sed quis tempus arcu.",
    };
  },
  PostListSize({ viewer, author }) {
    return 1000;
  },
  PostListAtIndex({ viewer, author, index }) {
    return { author, createdAt: sameCreatedAt.inc(index) };
  },
  PostFeedListSize({ owner }) {
    return 1000;
  },
  PostFeedListAtIndex({ owner, index }) {
    return { author: owner, createdAt: sameCreatedAt.inc(index) };
  },
};

const sameCreatedAt = Timestamp.now();
const makeFakeAccountId = (seed: number) => {
  const fakeId = new Array(32).fill(seed);
  return AccountId.fromUint8Array(Uint8Array.from(fakeId));
};
*/
