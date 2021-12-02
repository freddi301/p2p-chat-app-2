import { AccountId } from "./common/AccountId";

export type Queries = {
  AccountListSize(): number;
  AccountListAtIndex(params: { index: number }): AccountId | null;
  AccountById(params: { id: AccountId }): { name: string; description: string } | null;
};
