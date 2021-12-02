import React from "react";
import { css } from "styled-components/macro";
import { Icon } from "./Icon";

type InputProps = {
  value: string;
  label?: string;
  onChange?(value: string): void;
  required?: boolean;
};

export function Input({ value, label, onChange, required }: InputProps) {
  const readOnly = onChange === undefined;
  return (
    <div
      css={css`
        display: flex;
        height: ${(props) => props.theme.rowHeight};
        box-sizing: border-box;
        align-items: center;
        background-color: ${(props) => props.theme.primaryBackgroundColor};
        border-radius: ${(props) => props.theme.rowBorderRadius};
        padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
        :focus-within {
          background-color: ${(props) => props.theme.focusBackgroundColor};
        }
        transition: ${(props) => props.theme.transitionsDuration};
      `}
    >
      {label && (
        <label
          css={css`
            color: ${(props) => props.theme.secondaryTextColor};
            margin-right: ${(props) => props.theme.textSpacingHorizontal};
            font-weight: ${(props) => props.theme.fontWeightBold};
          `}
        >
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={(event) => onChange?.(event.currentTarget.value)}
        readOnly={readOnly}
        required={required}
        autoComplete="off"
        spellCheck={false}
        css={css`
          flex-grow: 1;
          color: inherit;
          border: none;
          outline: none;
          background-color: inherit;
          font-family: inherit;
          font-size: inherit;
          padding: 0px;
          margin: 0px;
        `}
      />
      {required && (
        <div
          css={css`
            color: ${(props) => (value === "" ? props.theme.primaryTextColor : props.theme.secondaryTextColor)};
          `}
        >
          <Icon icon="Required" />
        </div>
      )}
      {readOnly && (
        <div
          css={css`
            color: ${(props) => props.theme.secondaryTextColor};
          `}
        >
          <Icon icon="ReadOnly" />
        </div>
      )}
    </div>
  );
}
