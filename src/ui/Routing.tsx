import { AccountId } from "../domain/common/AccountId";

export type Routing =
  | { screen: "account-list" }
  | { screen: "account-create" }
  | { screen: "account"; id: AccountId }
  | { screen: "contact-list"; id: AccountId }
  | { screen: "conversation-list"; id: AccountId }
  | { screen: "post-list"; id: AccountId };
