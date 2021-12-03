import { Commands } from "../domain/commands";
import { AccountId } from "../domain/common/AccountId";
import { Timestamp } from "../domain/common/Timestamp";
import { Queries } from "../domain/queries";

export const commands: Commands = {
  AccountCreate() {},
  AccountUpdate() {},
  AccountDelete() {},
  ContactUpdate() {},
  ContactDelete() {},
  PostUpdate() {},
  PostDelete() {},
  DirectMessageUpdate() {},
  DirectMessageDelete() {},
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
  ContactListSize() {
    return 1000;
  },
  ContactListAtIndex({ index }) {
    const fakeId = new Array(32).fill(index);
    return AccountId.fromUint8Array(Uint8Array.from(fakeId));
  },
  ContactById({ id }) {
    return {
      name: "Name" + id.toHex(),
      description: "Description" + id.toHex(),
    };
  },
  PostById({ author, createdAt }) {
    return {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nisi ipsum, aliquet rhoncus gravida hendrerit, ornare quis nisl. Aliquam ornare sagittis mi a pellentesque. Aenean non ipsum nibh. Donec ac leo sapien. Phasellus at libero sed felis sodales ornare. Duis in commodo orci. Cras ullamcorper efficitur auctor. Nulla nec erat finibus, feugiat diam vel, accumsan quam. Sed quis tempus arcu.",
    };
  },
  PostListSize({ viewer, author }) {
    return 1000;
  },
  PostListAtIndex({ viewer, author, index }) {
    return { author, createdAt: sameCreatedAt.inc(index) };
  },
  PostFeedListSize({ owner }) {
    return 1000;
  },
  PostFeedListAtIndex({ owner, index }) {
    return { author: owner, createdAt: sameCreatedAt.inc(index) };
  },
};

const sameCreatedAt = Timestamp.now();
