import React from "react";
import { css } from "styled-components/macro";

type TruncatedLineProps = { text: string };
export function TruncatedLine({ text }: TruncatedLineProps) {
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        css={css`
          color: transparent;
          user-select: none;
        `}
      >
        X
      </div>
      <div
        css={css`
          display: block;
          position: absolute;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          top: 0;
        `}
      >
        {text}
      </div>
    </div>
  );
}
