import React from "react";
import { css } from "styled-components/macro";
import { AccountId } from "../../domain/common/AccountId";
import { TruncatedLine } from "./reusable/TruncatedLine";
import { queries } from "../FrontendFacade";

type AccountItemProps = { id: AccountId };
export function AccountItem({ id }: AccountItemProps) {
  const account = queries.AccountById({ id });
  if (!account) throw new Error();
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
        <TruncatedLine text={account.name} />
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
