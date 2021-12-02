import { AccountId } from "../domain/common/AccountId";

export type Routing =
  | { screen: "account-list" }
  | { screen: "account-create" }
  | { screen: "account"; accountId: AccountId };
