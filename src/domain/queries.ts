import { AccountId } from "./common/AccountId";

export type Queries = {
  AccountListSize(): number;
  AccountListAtIndex(params: { index: number }): AccountId | null;
  AccountById(params: { id: AccountId }): { name: string; description: string } | null;
  ContactListSize(params: { owner: AccountId }): number;
  ContactListAtIndex(params: { owner: AccountId; index: number }): AccountId | null;
  ContactById(params: { owner: AccountId; id: AccountId }): { name: string; description: string } | null;
};
