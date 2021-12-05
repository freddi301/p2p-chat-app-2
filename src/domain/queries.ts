import { AccountId } from "./common/AccountId";
import { AccountSecret } from "./common/AccountSecret";
import { FileId } from "./common/FileId";
import { Timestamp } from "./common/Timestamp";

export type Queries = {
  AccountListSize(): number;
  AccountListAtIndex(params: { index: number }): AccountId | null;
  AccountById(params: { id: AccountId }): { secret: AccountSecret; name: string; description: string } | null;
  ContactListSize(params: { owner: AccountId }): number;
  ContactListAtIndex(params: { owner: AccountId; index: number }): AccountId | null;
  ContactById(params: { owner: AccountId; id: AccountId }): { name: string; description: string } | null;
  ConversationListSize(params: { owner: AccountId }): number;
  ConversationListAtIndex(params: { owner: AccountId; index: number }): {
    other: AccountId;
    lastMessage: {
      sender: AccountId;
      recipient: AccountId;
      createdAt: Timestamp;
      text: string;
      attachments: Array<{ name: string; id: FileId }>;
    };
  } | null;
  ConversationSize(params: { owner: AccountId; other: AccountId }): number;
  ConversationAtIndex(params: { owner: AccountId; other: AccountId; index: number }): {
    sender: AccountId;
    recipient: AccountId;
    createdAt: Timestamp;
  } | null;
  DirectMessageById(params: { sender: AccountId; recipient: AccountId; createdAt: Timestamp }): {
    text: string;
    attachments: Array<{ name: string; id: FileId }>;
  };
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
