import React from "react";
import { css } from "styled-components/macro";
import { AccountId } from "../../domain/common/AccountId";
import { Timestamp } from "../../domain/common/Timestamp";
import { queries } from "../FrontendFacade";
import { Avatar } from "./reusable/Avatar";
import { TruncatedLine } from "./reusable/TruncatedLine";

type PostItemProps = {
  viewer: AccountId;
  author: AccountId;
  createdAt: Timestamp;
};
export function PostItem({ viewer, author, createdAt }: PostItemProps) {
  const post = queries.PostById({ author, createdAt });
  if (!post) throw new Error();
  const contact = queries.ContactById({ owner: viewer, id: author });
  const account = queries.AccountById({ id: author });
  const authorName = contact?.name ?? account?.name ?? "???";
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto auto auto;
        padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
        column-gap: ${(props) => props.theme.gap};
      `}
    >
      <div
        css={css`
          grid-row: 1 / span 2;
          grid-column: 1;
        `}
      >
        <Avatar />
      </div>
      <div
        css={css`
          grid-row: 1;
          grid-column: 2;
          font-weight: ${(props) => props.theme.fontWeightBold};
        `}
      >
        <TruncatedLine text={authorName} />
      </div>
      <div
        css={css`
          grid-row: 1;
          grid-column: 3;
          display: flex;
          align-items: flex-end;
          color: ${(props) => props.theme.secondaryTextColor};
          font-size: ${(props) => props.theme.fontSizeSmall};
          text-align: right;
        `}
      >
        {dateTimeFormatter.format(createdAt.toDate())}
      </div>
      <div
        css={css`
          grid-row: 2;
          grid-column: 2 / span 2;
          color: ${(props) => props.theme.secondaryTextColor};
        `}
      >
        <TruncatedLine text={author.toHex()} />
      </div>
      <div
        css={css`
          grid-row: 3;
          grid-column: 1 / span 3;
          white-space: pre-line;
          word-break: break-word;
        `}
      >
        {post.text}
      </div>
    </div>
  );
}
const dateTimeFormatter = Intl.DateTimeFormat([], { dateStyle: "short", timeStyle: "short" });
