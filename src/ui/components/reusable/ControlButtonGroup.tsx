import React from "react";
import { css } from "styled-components/macro";

type ControlButtonGroupProps = {
  children: React.ReactNode;
};
export function ControlButtonGroup({ children }: ControlButtonGroupProps) {
  return (
    <div
      css={css`
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
        grid-template-rows: auto;
        grid-column-gap: ${(props) => props.theme.gap};
        align-items: center;
        justify-content: end;
        padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
      `}
    >
      {children}
    </div>
  );
}
