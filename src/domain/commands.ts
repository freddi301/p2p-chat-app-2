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
};
