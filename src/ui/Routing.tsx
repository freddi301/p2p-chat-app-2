import { AccountId } from "../domain/common/AccountId";

export type Routing =
  | { screen: "account-list" }
  | { screen: "account-create" }
  | { screen: "account"; id: AccountId }
  | { screen: "contact-list"; owner: AccountId }
  | { screen: "contact-create"; owner: AccountId }
  | { screen: "contact"; owner: AccountId; id: AccountId }
  | { screen: "conversation-list"; owner: AccountId }
  | { screen: "conversation-create"; owner: AccountId }
  | { screen: "conversation"; owner: AccountId; other: AccountId }
  | { screen: "post-list"; viewer: AccountId; author: AccountId }
  | { screen: "post-feed-list"; owner: AccountId };
