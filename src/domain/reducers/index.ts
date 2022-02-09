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
import { AccountId } from "../common/AccountId";
import { Timestamp } from "../common/Timestamp";
import { FileId } from "../common/FileId";
import { Map } from "../../lib/immutable/Map";

export const reducer = makeCombinedReducer({
  accounts: accountsReducer,
  contacts: contactsReducer,
  directMessages: directMessagesReducer,
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

// should be a reducer
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

// should be a reducer
const getConversation = (state: State, owner: AccountId, other: AccountId) => {
  return state.directMessages.entries().flatMap(([id, state]) => {
    if (
      ((id.sender.equals(owner) && id.recipient.equals(other)) ||
        (id.sender.equals(other) && id.recipient.equals(owner))) &&
      state.type === "updated"
    ) {
      return [id];
    }
    return [];
  });
};

// should be a reducer
const getConversationList = (state: State, owner: AccountId) => {
  const map = state.directMessages.entries().reduce((map, [id, state]) => {
    if ((id.sender.equals(owner) || id.recipient.equals(owner)) && state.type === "updated") {
      const other = id.sender.equals(owner) ? id.recipient : id.sender;
      const existing = map.get(other);
      if (!existing || Timestamp.greaterThan(id.createdAt, existing.createdAt)) {
        return map.set(other, {
          sender: id.sender,
          recipient: id.recipient,
          createdAt: id.createdAt,
          text: state.text,
          attachments: [],
        });
      }
    }
    return map;
  }, Map.empty<AccountId, { sender: AccountId; recipient: AccountId; createdAt: Timestamp; text: string; attachments: Array<{ name: string; id: FileId }> }>());
  return map
    .entries()
    .map(([other, { sender, recipient, createdAt, text, attachments }]) => {
      return {
        other,
        lastMessage: {
          sender,
          recipient,
          createdAt,
          text,
          attachments,
        },
      };
    })
    .sort((a, b) => a.lastMessage.createdAt.toEpochMillis() - b.lastMessage.createdAt.toEpochMillis());
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
  ConversationListSize({ owner }) {
    return getConversationList(this, owner).length;
  },
  ConversationListAtIndex({ owner, index }) {
    console.log(getConversationList(this, owner));
    return getConversationList(this, owner).at(index) ?? null;
  },
  ConversationSize({ owner, other }) {
    return getConversation(this, owner, other).length;
  },
  ConversationAtIndex({ owner, other, index }) {
    return getConversation(this, owner, other).at(index) ?? null;
  },
  DirectMessageById({ sender, recipient, createdAt }) {
    const existing = this.directMessages.get({ sender, recipient, createdAt }) ?? { type: "undefined" };
    switch (existing.type) {
      case "updated":
        return { text: existing.text, attachments: [] };
      default:
        return null;
    }
  },
};
