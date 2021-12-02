import React from "react";
import { css } from "styled-components/macro";

type SimpleHeaderProps = {
  children: React.ReactNode;
};
export function SimpleHeader({ children }: SimpleHeaderProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
        height: calc(${(props) => props.theme.rowHeight} + ${(props) => props.theme.textSpacingVertical} * 2);
        box-sizing: border-box;
        font-size: ${(props) => props.theme.fontSizeBig};
      `}
    >
      {children}
    </div>
  );
}
