import React from "react";
import { css } from "styled-components/macro";
import { IconName } from "../themeIcons";
import { Icon } from "./Icon";

type ButtonProps = {
  label: string;
  icon?: IconName;
  enabled?: boolean;
  onClick(): void;
  showLabel?: boolean;
};

export function Button({ label, icon, onClick, enabled = true, showLabel = true }: ButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      onClick={() => {
        onClick();
      }}
      disabled={!enabled}
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: ${(props) => props.theme.rowMinWidth};
        height: ${(props) => props.theme.rowHeight};
        color: ${(props) => (enabled ? props.theme.primaryTextColor : props.theme.secondaryTextColor)};
        background-color: ${(props) => props.theme.primaryBackgroundColor};
        border-radius: ${(props) => props.theme.rowBorderRadius};
        border: none;
        outline: none;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;
        :focus {
          background-color: ${(props) => props.theme.focusBackgroundColor};
        }
        padding-top: ${(props) => props.theme.textSpacingVertical};
        padding-bottom: ${(props) => props.theme.textSpacingVertical};
        padding-left: ${(props) => (showLabel ? props.theme.textSpacingHorizontal : "")};
        padding-right: ${(props) => (showLabel ? props.theme.textSpacingHorizontal : "")};
        transition: ${(props) => props.theme.transitionsDuration};
      `}
      onMouseEnter={() => {
        ref.current?.focus();
      }}
      onMouseLeave={() => {
        ref.current?.blur();
      }}
    >
      {icon && <Icon icon={icon} />}
      {icon && showLabel && (
        <div
          css={css`
            width: ${(props) => props.theme.textSpacingHorizontal};
          `}
        ></div>
      )}
      {showLabel && label}
    </button>
  );
}
