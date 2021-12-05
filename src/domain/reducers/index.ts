import {
  ActionCreatorsFromCommnads,
  ActionOfReducer,
  StateOfReducer,
  StateSelectorsFromQueries,
} from "../../lib/reducer";
import { makeCombinedReducer } from "../../lib/reducer/factory";
import { accountsReducer } from "./account";
import { Commands } from "../commands";
import { contactsReducer } from "./contact";
import { Queries } from "../queries";
import { directMessagesReducer } from "./direct-message";
import { postsReducer } from "./post";
import { AccountId } from "../common/AccountId";

export const reducer = makeCombinedReducer({
  accounts: accountsReducer,
  contacts: contactsReducer,
  directMessages: directMessagesReducer,
  posts: postsReducer,
});

export type Action = ActionOfReducer<typeof reducer>;
export type State = StateOfReducer<typeof reducer>;

export const actionCreators: ActionCreatorsFromCommnads<Action, Commands> = {
  AccountUpdate({ id, description, name, secret, timestamp }) {
    return { key: "accounts", action: { key: id, action: { type: "update", timestamp, name, description, secret } } };
  },
  AccountDelete({ id, timestamp }) {
    return { key: "accounts", action: { key: id, action: { type: "delete", timestamp } } };
  },
  ContactUpdate({ id, description, name, owner, timestamp }) {
    return {
      key: "contacts",
      action: { key: { owner, contact: id }, action: { type: "update", name, description, timestamp } },
    };
  },
  ContactDelete({ id, owner, timestamp }) {
    return { key: "contacts", action: { key: { owner, contact: id }, action: { type: "delete", timestamp } } };
  },
  DirectMessageUpdate({ sender, recipient, createdAt, timestamp, text }) {
    return {
      key: "directMessages",
      action: { key: { sender, recipient, createdAt }, action: { type: "update", timestamp, text } },
    };
  },
  DirectMessageDelete({ sender, recipient, createdAt, timestamp }) {
    return {
      key: "directMessages",
      action: { key: { sender, recipient, createdAt }, action: { type: "delete", timestamp } },
    };
  },
  PostUpdate({ author, createdAt, timestamp, text }) {
    return {
      key: "posts",
      action: { key: { author, createdAt }, action: { type: "update", timestamp, text } },
    };
  },
  PostDelete({ author, createdAt, timestamp }) {
    return {
      key: "posts",
      action: { key: { author, createdAt }, action: { type: "delete", timestamp } },
    };
  },
};

// should be a reducer
const getAccountList = (state: State) => {
  return state.accounts
    .entries()
    .flatMap(([id, state]) =>
      state.type === "updated" ? [{ id, name: state.name, description: state.description }] : []
    )
    .sort((a, b) => a.name.localeCompare(b.name));
};

const getContactList = (state: State, owner: AccountId) => {
  return state.contacts
    .entries()
    .flatMap(([id, state]) =>
      state.type === "updated" && id.owner.equals(owner)
        ? [{ id, name: state.name, description: state.description }]
        : []
    )
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const stateSelectors: StateSelectorsFromQueries<State, Queries> = {
  AccountListSize() {
    return getAccountList(this).length;
  },
  AccountListAtIndex({ index }) {
    return getAccountList(this).at(index)?.id ?? null;
  },
  AccountById({ id }) {
    const existing = this.accounts.get(id) ?? { type: "undefined" };
    switch (existing.type) {
      case "updated":
        return { name: existing.name, description: existing.description, secret: existing.secret };
      default:
        return null;
    }
  },
  ContactListSize({ owner }) {
    return getContactList(this, owner).length;
  },
  ContactListAtIndex({ owner, index }) {
    return getContactList(this, owner).at(index)?.id.contact ?? null;
  },
  ContactById({ owner, id }) {
    const existing = this.contacts.get({ owner, contact: id }) ?? { type: "undefined" };
    switch (existing.type) {
      case "updated":
        return { name: existing.name, description: existing.description };
      default:
        return null;
    }
  },
  ConversationListSize() {
    throw new Error();
  },
  ConversationListAtIndex() {
    throw new Error();
  },
  ConversationSize() {
    throw new Error();
  },
  ConversationAtIndex() {
    throw new Error();
  },
  DirectMessageById() {
    throw new Error();
  },
  PostListSize() {
    throw new Error();
  },
  PostListAtIndex() {
    throw new Error();
  },
  PostById() {
    throw new Error();
  },
  PostFeedListSize() {
    throw new Error();
  },
  PostFeedListAtIndex() {
    throw new Error();
  },
};
