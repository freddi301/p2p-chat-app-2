import { AccountSecret } from "./common/AccountSecret";
import { AccountId } from "./common/AccountId";
import { Timestamp } from "./common/Timestamp";

export type Commands = {
  AccountCreate(params: {
    id: AccountId;
    secret: AccountSecret;
    timestamp: Timestamp;
    name: string;
    description: string;
  }): void;
  AccountUpdate(params: { id: AccountId; timestamp: Timestamp; name: string; description: string }): void;
  AccountDelete(params: { id: AccountId; timestamp: Timestamp }): void;
  ContactUpdate(params: {
    owner: AccountId;
    id: AccountId;
    timestamp: Timestamp;
    name: string;
    description: string;
  }): void;
  ContactDelete(params: { owner: AccountId; id: AccountId; timestamp: Timestamp }): void;
  PostUpdate(params: { author: AccountId; createdAd: Timestamp; timestamp: Timestamp; text: string }): void;
  PostDelete(params: { author: AccountId; createdAd: Timestamp; timestamp: Timestamp }): void;
  DirectMessageUpdate(params: { sender: AccountId; receiver: AccountId; createdAt: Timestamp; text: string }): void;
  DirectMessageDelete(params: { sender: AccountId; receiver: AccountId; createdAt: Timestamp }): void;
};
