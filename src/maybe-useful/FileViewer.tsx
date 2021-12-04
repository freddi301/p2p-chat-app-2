import React from "react";
import { css } from "styled-components/macro";

type FileViewerProps = { name: string; src: string };
export function FileViewer({ name, src }: FileViewerProps) {
  if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(name)) {
    return (
      <img
        src={src}
        alt=""
        css={css`
          width: 100%;
          max-height: 80vh;
          object-fit: contain;
        `}
      />
    );
  }
  if (/\.(?:wav|mp3|m4a)$/i.test(name)) {
    return (
      <audio
        controls
        css={css`
          width: 100%;
          height: 50px;
        `}
      >
        <source src={src} />
      </audio>
    );
  }
  if (/\.(?:mkv|mp4)$/i.test(name)) {
    return (
      <video
        controls
        css={css`
          width: 100%;
          max-height: 80vh;
        `}
      >
        <source src={src} />
      </video>
    );
  }
  if (/\.pdf$/i.test(name)) {
    return (
      <iframe
        css={css`
          border: none;
          width: 100%;
          max-height: 80vh;
        `}
        title={name}
        src={src}
      ></iframe>
    );
  }
  return null;
}
