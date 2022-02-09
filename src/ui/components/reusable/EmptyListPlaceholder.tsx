import React from "react";
import { css } from "styled-components/macro";

type EmptyListPlaceholderProps = { children: string };
export function EmptyListPlaceholder({ children }: EmptyListPlaceholderProps) {
  return (
    <div
      css={css`
        padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
        color: ${(props) => props.theme.secondaryTextColor};
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {children}
    </div>
  );
}
