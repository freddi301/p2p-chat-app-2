import React from "react";
import { css } from "styled-components/macro";

type AvatarProps = {};
export function Avatar(props: AvatarProps) {
  return (
    <div
      css={css`
        width: ${(props) => props.theme.rowMinWidth};
        height: ${(props) => props.theme.rowHeight};
        background-color: mediumaquamarine;
      `}
    ></div>
  );
}
