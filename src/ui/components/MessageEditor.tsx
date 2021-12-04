import React from "react";
import { css, useTheme } from "styled-components/macro";
import { FileId } from "../../domain/common/FileId";
import { Button } from "./base/Button";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

type MessageEditorProps = {
  onSend: (text: string, attachments: Array<{ name: string; id: FileId }>) => void;
  submitOnEnter: boolean;
};
export function MessageEditor({ onSend, submitOnEnter }: MessageEditorProps) {
  const [text, setText] = React.useState("");
  const [attachments, setAttachments] = React.useState<Array<{ name: string; id: FileId }>>([]);
  const send = async () => {
    setText("");
    setAttachments([]);
    onSend(text, attachments);
  };
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  React.useLayoutEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "";
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, [text]);
  const [showEmojis, setShowEmojis] = React.useState(false);
  const theme = useTheme();
  const canSend = text.trim() !== "" || attachments.length > 0;
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: auto 1fr auto auto;
        grid-template-rows: auto auto;
        grid-template-areas:
          "picker picker picker picker"
          "emoji text attachment send";
        background-color: ${(props) => props.theme.primaryBackgroundColor};
        border-radius: ${(props) => props.theme.rowBorderRadius};
        margin: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
      `}
    >
      <div
        css={css`
          grid-area: picker;
          height: ${showEmojis ? "380px" : "0px"};
          overflow-y: hidden;
          transition: ${(props) => props.theme.transitionsDuration};
          .emoji-mart-dark {
            background-color: ${(props) => props.theme.primaryBackgroundColor};
            border-radius: ${(props) => props.theme.rowBorderRadius} ${(props) => props.theme.rowBorderRadius} 0px 0px;
            border: none;
          }
          .emoji-mart-bar {
            border-color: ${(props) => props.theme.secondaryBackgroundColor};
          }
          .emoji-mart-preview {
            height: ${(props) => props.theme.rowHeight};
          }
          .emoji-mart-search {
            margin: 0;
          }
          .emoji-mart-dark .emoji-mart-category-label span {
            background-color: ${(props) => props.theme.primaryBackgroundColor};
            color: ${(props) => props.theme.secondaryTextColor};
          }
          .emoji-mart-dark .emoji-mart-anchor {
            color: ${(props) => props.theme.secondaryTextColor};
            padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
          }
          .emoji-mart-dark .emoji-mart-search input {
            background-color: ${(props) => props.theme.primaryBackgroundColor};
            color: ${(props) => props.theme.primaryTextColor};
            border-color: ${(props) => props.theme.borderColor};
            border-radius: 0px;
            display: flex;
            align-items: center;
          }
        `}
      >
        {
          <Picker
            style={{ width: "100%" }}
            theme="dark"
            color={theme.primaryTextColor}
            native={true}
            showSkinTones={true}
            emojiTooltip={true}
            title="choose skin tone"
            emoji=""
            onSelect={(emoji) => {
              if (textRef.current) {
                textRef.current.setRangeText(
                  (emoji as any).native,
                  textRef.current.selectionStart,
                  textRef.current.selectionEnd,
                  "end"
                );
                setText(textRef.current.value);
                textRef.current.focus();
              }
            }}
          />
        }
      </div>
      <div
        css={css`
          grid-area: emoji;
          align-self: end;
        `}
      >
        <Button
          icon="Emoji"
          label="Emoji"
          onClick={() => setShowEmojis((showEmojis) => !showEmojis)}
          showLabel={false}
        />
      </div>
      <div
        css={css`
          grid-area: text;
          display: flex;
          align-items: center;
        `}
      >
        <textarea
          ref={textRef}
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          autoComplete="off"
          spellCheck={false}
          rows={1}
          css={css`
            flex-grow: 1;
            color: inherit;
            border: none;
            outline: none;
            resize: none;
            background-color: inherit;
            font-family: inherit;
            font-size: inherit;
            padding: 0px;
            margin: ${(props) => props.theme.textSpacingVertical} 0px;
          `}
          onKeyDown={(event) => {
            if (submitOnEnter) {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                send();
                event.currentTarget.focus();
              }
            }
          }}
        />
      </div>
      <div
        css={css`
          grid-area: attachment;
          align-self: end;
        `}
      >
        <Button
          icon="Attachment"
          label="Attach"
          onClick={() => {
            const id = FileId.fromUint8Array(Uint8Array.from(new Array(32).fill(0)));
            const moreAttachments = [
              { name: "attachement" + Math.random() + ".txt", id },
              { name: "another.png", id },
            ];
            setAttachments((attachments) => [...attachments, ...moreAttachments]);
          }}
          showLabel={false}
        />
      </div>
      <div
        css={css`
          grid-area: send;
          align-self: end;
        `}
      >
        <Button label="Send" icon="Send" onClick={send} enabled={canSend} showLabel={false} />
      </div>
    </div>
  );
}

/*
attachments.map((attachment, index) => {
  return (
    <div
      key={index}
      css={css`
        border-right: 1px solid ${props => props.theme.colors.background.passive};
        width: 200px;
        position: relative;
      `}
    >
      <FileView
        name={attachment.name}
        src={
          attachment.src.type === "path" ? attachment.src.path : URL.createObjectURL(attachment.src.file)
        }
        width={200}
        height={200}
      />
      <div
        css={css`
          padding: ${props => props.theme.spacing.text.vertical} ${props => props.theme.spacing.text.horizontal};
        `}
      >
        <Text color="secondary" text={attachment.name} truncatedLine={true} size="normal" weight="normal" />
      </div>
      <div
        css={css`
          position: absolute;
          top: ${props => props.theme.spacing.text.vertical};
          right: ${props => props.theme.spacing.text.vertical};
        `}
      >
        <Button
          icon="Close"
          label="Remove"
          onClick={() => {
            setAttachments(attachments.filter((a, i) => i !== index));
          }}
          enabled={true}
          showLabel={false}
        />
      </div>
    </div>
  );
})
*/
