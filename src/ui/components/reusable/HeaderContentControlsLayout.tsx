import React from "react";
import { css } from "styled-components/macro";
import { Clickable } from "../base/Clickable";
import { Icon } from "../base/Icon";
import { RoutingContext } from "../routing/useRoutingWithAnimation";

type HeaderContentControlsLayoutProps = {
  header: React.ReactNode;
  content: React.ReactNode;
  controls: React.ReactNode;
};

export function HeaderContentControlsLayout({ header, content, controls }: HeaderContentControlsLayoutProps) {
  const { pop } = React.useContext(RoutingContext);
  const back = () => {
    pop();
  };
  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      {header && (
        <div
          css={css`
            height: calc(${(props) => props.theme.rowHeight} + ${(props) => props.theme.textSpacingVertical} * 2);
            border-bottom: 1px solid ${(props) => props.theme.borderColor};
            display: flex;
          `}
        >
          <Clickable onClick={back}>
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                color: ${(props) => props.theme.secondaryTextColor};
                font-size: ${(props) => props.theme.fontSizeBig};
              `}
            >
              <Icon icon="Back" />
            </div>
          </Clickable>
          <div
            css={css`
              flex-grow: 1;
            `}
          >
            {header}
          </div>
        </div>
      )}
      <div
        css={css`
          flex-grow: 1;
        `}
      >
        {content}
      </div>
      {controls && (
        <div
          css={css`
            height: calc(${(props) => props.theme.rowHeight} + ${(props) => props.theme.textSpacingVertical} * 2);
            border-top: 1px solid ${(props) => props.theme.borderColor};
          `}
        >
          {controls}
        </div>
      )}
    </div>
  );
}
