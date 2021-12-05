import { Reducer } from "../../lib/reducer";
import { makeKeyedReducer } from "../../lib/reducer/factory";
import { AccountId } from "../common/AccountId";
import { Timestamp } from "../common/Timestamp";

type DirectMessageState =
  | { type: "undefined" }
  | { type: "updated"; timestamp: Timestamp; text: string }
  | { type: "deleted"; timestamp: Timestamp };

type DirectMessageAction =
  | { type: "update"; timestamp: Timestamp; text: string }
  | { type: "delete"; timestamp: Timestamp };

const directMessageInitialState: DirectMessageState = { type: "undefined" };

const directMessageReducer: Reducer<DirectMessageState, DirectMessageAction> = (state, action) => {
  if (state.type !== "undefined" && !Timestamp.greaterThan(action.timestamp, state.timestamp)) return state;
  switch (action.type) {
    case "delete":
      return { type: "deleted", timestamp: action.timestamp };
    case "update":
      return { type: "updated", timestamp: action.timestamp, text: action.text };
  }
};

type DirectMessageUIDAttributes = {
  sender: AccountId;
  recipient: AccountId;
  createdAt: Timestamp;
};

export const directMessagesReducer = makeKeyedReducer<
  DirectMessageUIDAttributes,
  DirectMessageState,
  DirectMessageAction
>(directMessageReducer, directMessageInitialState);
