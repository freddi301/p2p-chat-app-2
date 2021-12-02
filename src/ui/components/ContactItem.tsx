import React from "react";
import { css } from "styled-components/macro";
import { AccountId } from "../../domain/common/AccountId";
import { TruncatedLine } from "./reusable/TruncatedLine";
import { queries } from "../FrontendFacade";

type ContactItemProps = { id: AccountId; owner: AccountId };
export function ContactItem({ id, owner }: ContactItemProps) {
  const contact = queries.ContactById({ id, owner });
  if (!contact) throw new Error();
  return (
    <div
      css={css`
        padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
      `}
    >
      <div
        css={css`
          font-weight: ${(props) => props.theme.fontWeightBold};
        `}
      >
        <TruncatedLine text={contact.name} />
      </div>
      <div
        css={css`
          color: ${(props) => props.theme.secondaryTextColor};
        `}
      >
        <TruncatedLine text={id.toHex()} />
      </div>
    </div>
  );
}
