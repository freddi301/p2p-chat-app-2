import React from "react";
import { css } from "styled-components/macro";

type ClickableProps = {
  children: React.ReactNode;
  onClick(): void;
};
export function Clickable({ children, onClick }: ClickableProps) {
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onClick();
        }
      }}
      css={css`
        outline: none;
        cursor: pointer;
        user-select: none;
        :focus {
          background-color: ${(props) => props.theme.focusBackgroundColor};
        }
        :hover {
          background-color: ${(props) => props.theme.focusBackgroundColor};
        }
        transition: ${(props) => props.theme.transitionsDuration};
      `}
    >
      {children}
    </div>
  );
}
