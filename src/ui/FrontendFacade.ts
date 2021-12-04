import { Commands } from "../domain/commands";
import { AccountId } from "../domain/common/AccountId";
import { FileId } from "../domain/common/FileId";
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
    return makeFakeAccountId(index);
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
    return makeFakeAccountId(index);
  },
  ContactById({ id }) {
    return {
      name: "Name" + id.toHex(),
      description: "Description" + id.toHex(),
    };
  },
  ConversationListSize({ owner }) {
    return 1000;
  },
  ConversationListAtIndex({ owner, index }) {
    const other = makeFakeAccountId(index);
    const fakeId = new Array(32).fill(index);
    const fileId = FileId.fromUint8Array(Uint8Array.from(fakeId));
    return {
      other,
      lastMessage: {
        sender: owner,
        recipient: other,
        createdAt: sameCreatedAt.inc(index),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nVestibulum nisi ipsum, aliquet rhoncus gravida hendrerit, ornare quis nisl.",
        attachments: new Array(index).fill({ name: "file", id: fileId }),
      },
    };
  },
  ConversationSize({ owner, other }) {
    return 100000;
  },
  ConversationAtIndex({ owner, other, index }) {
    return {
      sender: owner,
      recipient: other,
      createdAt: sameCreatedAt.inc(index),
    };
  },
  DirectMessageById({ sender, recipient, createdAt }) {
    const fakeId = new Array(32).fill(0);
    const fileId = FileId.fromUint8Array(Uint8Array.from(fakeId));
    return {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nisi ipsum, aliquet rhoncus gravida hendrerit, ornare quis nisl. Aliquam ornare sagittis mi a pellentesque. Aenean non ipsum nibh. Donec ac leo sapien. Phasellus at libero sed felis sodales ornare. Duis in commodo orci. Cras ullamcorper efficitur auctor. Nulla nec erat finibus, feugiat diam vel, accumsan quam. Sed quis tempus arcu.".slice(
        0,
        createdAt.toDate().getTime() % 100
      ),
      attachments: [
        { name: "veryloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong.pdf", id: fileId },
        { name: "file.txt", id: fileId },
      ],
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
const makeFakeAccountId = (seed: number) => {
  const fakeId = new Array(32).fill(seed);
  return AccountId.fromUint8Array(Uint8Array.from(fakeId));
};
