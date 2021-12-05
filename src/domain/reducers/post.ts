import { Reducer } from "../../lib/reducer";
import { makeKeyedReducer } from "../../lib/reducer/factory";
import { AccountId } from "../common/AccountId";
import { Timestamp } from "../common/Timestamp";

type PostState =
  | { type: "undefined" }
  | { type: "updated"; timestamp: Timestamp; text: string }
  | { type: "deleted"; timestamp: Timestamp };

type PostAction = { type: "update"; timestamp: Timestamp; text: string } | { type: "delete"; timestamp: Timestamp };

const postInitialState: PostState = { type: "undefined" };

const postReducer: Reducer<PostState, PostAction> = (state, action) => {
  if (state.type !== "undefined" && !Timestamp.greaterThan(action.timestamp, state.timestamp)) return state;
  switch (action.type) {
    case "delete":
      return { type: "deleted", timestamp: action.timestamp };
    case "update":
      return { type: "updated", timestamp: action.timestamp, text: action.text };
  }
};

type PostUIDAttributes = {
  author: AccountId;
  createdAt: Timestamp;
};

export const postsReducer = makeKeyedReducer<PostUIDAttributes, PostState, PostAction>(postReducer, postInitialState);
