import { ActionCreatorsFromCommnads, ActionOfReducer, StateOfReducer, StateSelectorsFromQueries } from "../lib/reducer";
import { makeCombinedReducer } from "../lib/reducer/factory";
import { accountsReducer } from "./account";
import { Commands } from "./commands";
import { contactsReducer } from "./contact";
import { Queries } from "./queries";

export const reducer = makeCombinedReducer({
  accounts: accountsReducer,
  contacts: contactsReducer,
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
  DirectMessageUpdate() {
    throw new Error();
  },
  DirectMessageDelete() {
    throw new Error();
  },
  PostUpdate() {
    throw new Error();
  },
  PostDelete() {
    throw new Error();
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
  ContactById() {
    throw new Error();
  },
  ContactListAtIndex() {
    throw new Error();
  },
  ContactListSize() {
    throw new Error();
  },
  ConversationAtIndex() {
    throw new Error();
  },
  ConversationListAtIndex() {
    throw new Error();
  },
  ConversationListSize() {
    throw new Error();
  },
  ConversationSize() {
    throw new Error();
  },
  DirectMessageById() {
    throw new Error();
  },
  PostById() {
    throw new Error();
  },
  PostFeedListAtIndex() {
    throw new Error();
  },
  PostFeedListSize() {
    throw new Error();
  },
  PostListAtIndex() {
    throw new Error();
  },
  PostListSize() {
    throw new Error();
  },
};
