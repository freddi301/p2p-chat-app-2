import { AccountId } from "./common/AccountId";
import { Timestamp } from "./common/Timestamp";

export type Queries = {
  AccountListSize(): number;
  AccountListAtIndex(params: { index: number }): AccountId | null;
  AccountById(params: { id: AccountId }): { name: string; description: string } | null;
  ContactListSize(params: { owner: AccountId }): number;
  ContactListAtIndex(params: { owner: AccountId; index: number }): AccountId | null;
  ContactById(params: { owner: AccountId; id: AccountId }): { name: string; description: string } | null;
  PostListSize(params: { viewer: AccountId; author: AccountId }): number;
  PostListAtIndex(params: {
    viewer: AccountId;
    author: AccountId;
    index: number;
  }): { author: AccountId; createdAt: Timestamp } | null;
  PostById(params: { author: AccountId; createdAt: Timestamp }): { text: string } | null;
  PostFeedListSize(params: { owner: AccountId }): number;
  PostFeedListAtIndex(params: { owner: AccountId; index: number }): { author: AccountId; createdAt: Timestamp } | null;
};
