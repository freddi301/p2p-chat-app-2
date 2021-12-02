import { Commands } from "../domain/commands";
import { AccountId } from "../domain/common/AccountId";
import { Queries } from "../domain/queries";

export const commands: Commands = {
  AccountCreate() {},
  AccountUpdate() {},
  AccountDelete() {},
};

export const queries: Queries = {
  AccountListSize() {
    return 1000;
  },
  AccountListAtIndex({ index }) {
    const fakeId = new Array(32).fill(index);
    return AccountId.fromUint8Array(Uint8Array.from(fakeId));
  },
  AccountById({ id }) {
    return {
      name: "Name" + id.toHex(),
      description: "Description" + id.toHex(),
    };
  },
};
