import { AccountSecret } from "./common/AccountSecret";
import { AccountId } from "./common/AccountId";
import { Timestamp } from "./common/Timestamp";
import { FileId } from "./common/FileId";

export type Commands = {
  AccountUpdate(params: {
    id: AccountId;
    timestamp: Timestamp;
    secret: AccountSecret;
    name: string;
    description: string;
  }): void;
  AccountDelete(params: { id: AccountId; timestamp: Timestamp }): void;
  ContactUpdate(params: {
    owner: AccountId;
    id: AccountId;
    timestamp: Timestamp;
    name: string;
    description: string;
  }): void;
  ContactDelete(params: { owner: AccountId; id: AccountId; timestamp: Timestamp }): void;
  DirectMessageUpdate(params: {
    sender: AccountId;
    recipient: AccountId;
    createdAt: Timestamp;
    timestamp: Timestamp;
    text: string;
    attachments: Array<{ name: string; id: FileId }>;
  }): void;
  DirectMessageDelete(params: {
    sender: AccountId;
    recipient: AccountId;
    createdAt: Timestamp;
    timestamp: Timestamp;
  }): void;
};
