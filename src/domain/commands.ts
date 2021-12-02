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
};
