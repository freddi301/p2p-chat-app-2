import { AccountId } from "../domain/common/AccountId";

export type Routing =
  | { screen: "account-list" }
  | { screen: "account-create" }
  | { screen: "account"; id: AccountId }
  | { screen: "contact-list"; owner: AccountId; id: AccountId }
  | { screen: "contact-create"; owner: AccountId }
  | { screen: "contact"; owner: AccountId; id: AccountId }
  | { screen: "conversation-list"; owner: AccountId }
  | { screen: "conversation"; owner: AccountId; id: AccountId }
  | { screen: "post-list"; owner: AccountId; id: AccountId }
  | { screen: "post-feed"; owner: AccountId };
