import React from "react";
import { css, useTheme } from "styled-components/macro";
import logo from "./ContactQRCodeLogo.svg";
import easyqrcodejs from "easyqrcodejs";

type contactQRCodeProps = { text: string };
export function ContactQRcode({ text }: contactQRCodeProps) {
  const size = 200;
  const ref = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  React.useLayoutEffect(() => {
    if (ref.current) {
      new easyqrcodejs(ref.current, {
        text,
        logo,
        width: size,
        height: size,
        quietZone: 10,
        colorDark: theme.primaryBackgroundColor,
        colorLight: theme.primaryTextColor,
        correctLevel: easyqrcodejs.CorrectLevel.H,
      });
    }
  }, [text, theme.primaryBackgroundColor, theme.primaryTextColor]);
  return (
    <div
      ref={ref}
      css={css`
        border-radius: calc(${(props) => props.theme.rowBorderRadius});
        overflow: hidden;
        width: ${size}px;
        height: ${size}px;
      `}
    ></div>
  );
}
