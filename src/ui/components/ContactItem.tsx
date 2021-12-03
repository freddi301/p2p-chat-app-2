import React from "react";
import { css } from "styled-components/macro";
import { AccountId } from "../../domain/common/AccountId";
import { TruncatedLine } from "./reusable/TruncatedLine";
import { queries } from "../FrontendFacade";
import { Avatar } from "./reusable/Avatar";

type ContactItemProps = { id: AccountId; owner: AccountId };
export function ContactItem({ id, owner }: ContactItemProps) {
  const contact = queries.ContactById({ id, owner });
  if (!contact) throw new Error();
  return (
    <div
      css={css`
        padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: auto 1fr;
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
        <TruncatedLine text={contact.name} />
      </div>
      <div
        css={css`
          grid-row: 2;
          grid-column: 2;
          color: ${(props) => props.theme.secondaryTextColor};
        `}
      >
        <TruncatedLine text={id.toHex()} />
      </div>
    </div>
  );
}
