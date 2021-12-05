import { Reducer } from "../lib/reducer";
import { makeKeyedReducer } from "../lib/reducer/factory";
import { AccountId } from "./common/AccountId";
import { AccountSecret } from "./common/AccountSecret";
import { Timestamp } from "./common/Timestamp";

type AccountState =
  | { type: "undefined" }
  | { type: "updated"; timestamp: Timestamp; secret: AccountSecret; name: string; description: string }
  | { type: "deleted"; timestamp: Timestamp };

type AccountAction =
  | { type: "update"; timestamp: Timestamp; secret: AccountSecret; name: string; description: string }
  | { type: "delete"; timestamp: Timestamp };

const accountInitialState: AccountState = { type: "undefined" };

const accountReducer: Reducer<AccountState, AccountAction> = (state, action) => {
  if (state.type !== "undefined" && !Timestamp.greaterThan(action.timestamp, state.timestamp)) return state;
  switch (action.type) {
    case "update":
      return {
        type: "updated",
        timestamp: action.timestamp,
        secret: action.secret,
        name: action.name,
        description: action.description,
      };
    case "delete":
      return { type: "deleted", timestamp: action.timestamp };
  }
};

export const accountsReducer = makeKeyedReducer<AccountId, AccountState, AccountAction>(
  accountReducer,
  accountInitialState
);
