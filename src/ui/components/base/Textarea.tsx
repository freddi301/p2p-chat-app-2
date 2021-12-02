import React from "react";
import { css } from "styled-components/macro";
import { Icon } from "./Icon";

type TextareaProps = {
  label?: string;
  value: string;
  onChange?(value: string): void;
  required?: boolean;
};

export function Textarea({ value, label, onChange, required }: TextareaProps) {
  const readOnly = onChange === undefined;
  const ref = React.useRef<HTMLTextAreaElement>(null);
  React.useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.height = "";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [value]);
  return (
    <div
      css={css`
        min-height: ${(props) => props.theme.rowHeight};
        box-sizing: border-box;
        background-color: ${(props) => props.theme.primaryBackgroundColor};
        border-radius: ${(props) => props.theme.rowBorderRadius};
        :focus-within {
          background-color: ${(props) => props.theme.focusBackgroundColor};
        }
        transition: ${(props) => props.theme.transitionsDuration};
      `}
    >
      <div
        css={css`
          display: flex;
          margin: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal} 0px
            ${(props) => props.theme.textSpacingHorizontal};
        `}
      >
        {label && (
          <div
            css={css`
              color: ${(props) => props.theme.secondaryTextColor};
              font-weight: ${(props) => props.theme.fontWeightBold};
            `}
          >
            {label}
          </div>
        )}
        <div
          css={css`
            flex-grow: 1;
          `}
        ></div>
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
      <textarea
        ref={ref}
        value={value}
        readOnly={readOnly}
        onChange={(event) => {
          onChange?.(event.currentTarget.value);
        }}
        autoComplete="off"
        spellCheck={false}
        rows={1}
        css={css`
          width: calc(100% - ${(props) => props.theme.textSpacingHorizontal} * 2);
          color: inherit;
          border: none;
          outline: none;
          resize: none;
          background-color: inherit;
          font-family: inherit;
          font-size: inherit;
          padding: 0px;
          margin: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
        `}
      />
    </div>
  );
}
