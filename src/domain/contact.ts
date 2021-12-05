import { Reducer } from "../lib/reducer";
import { makeKeyedReducer } from "../lib/reducer/factory";
import { AccountId } from "./common/AccountId";
import { Timestamp } from "./common/Timestamp";

type ContactState =
  | { type: "undefined" }
  | { type: "updated"; timestamp: Timestamp; name: string; description: string }
  | { type: "deleted"; timestamp: Timestamp };

type ContactAction =
  | { type: "update"; timestamp: Timestamp; name: string; description: string }
  | { type: "delete"; timestamp: Timestamp };

const contactInitialState: ContactState = { type: "undefined" };

const contactReducer: Reducer<ContactState, ContactAction> = (state, action) => {
  if (state.type !== "undefined" && !Timestamp.greaterThan(action.timestamp, state.timestamp)) return state;
  switch (action.type) {
    case "delete":
      return { type: "deleted", timestamp: action.timestamp };
    case "update":
      return { type: "updated", timestamp: action.timestamp, name: action.name, description: action.description };
  }
};

type ContactUIDAttributes = {
  owner: AccountId;
  contact: AccountId;
};

export const contactsReducer = makeKeyedReducer<ContactUIDAttributes, ContactState, ContactAction>(
  contactReducer,
  contactInitialState
);
