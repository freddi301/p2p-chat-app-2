import React from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { css } from "styled-components/macro";
import { AccountId } from "../../domain/common/AccountId";
import { FileId } from "../../domain/common/FileId";
import { Timestamp } from "../../domain/common/Timestamp";
import { Map } from "../../lib/immutable/Map";
import { Button } from "../components/base/Button";
import { Icon } from "../components/base/Icon";
import { EmptyListPlaceholder } from "../components/reusable/EmptyListPlaceholder";
import { HeaderContentControlsLayout } from "../components/reusable/HeaderContentControlsLayout";
import { SimpleHeader } from "../components/reusable/SimpleHeader";
import { TruncatedLine } from "../components/reusable/TruncatedLine";
import { commands, queries } from "../FrontendFacade";

type ConversationScreenProps = {
  owner: AccountId;
  other: AccountId;
};
export function ConversationScreen({ owner, other }: ConversationScreenProps) {
  const onSend = (text: string, attachments: Array<{ name: string; id: FileId }>) => {
    commands.DirectMessageUpdate({ sender: owner, receiver: other, createdAt: Timestamp.now(), text, attachments });
  };
  const conversationSize = queries.ConversationSize({ owner, other });
  const [isAtBottom, setIsAtBottom] = React.useState(false);
  const virtuosoRef = React.useRef<VirtuosoHandle>(null);
  const scrollToBottom = () => {
    virtuosoRef.current?.scrollToIndex({ index: conversationSize + 1, behavior: "smooth" });
  };
  const [scrollPosition, setScrollPosition] = useConversationScrollPosition(owner, other);
  return (
    <HeaderContentControlsLayout
      header={<SimpleHeader>Conversation</SimpleHeader>}
      content={
        <div
          css={css`
            height: 100%;
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              flex-grow: 1;
            `}
          >
            {conversationSize === 0 ? (
              <EmptyListPlaceholder>No messages</EmptyListPlaceholder>
            ) : (
              <Virtuoso
                ref={virtuosoRef}
                style={{ height: "100%" }}
                totalCount={conversationSize}
                itemContent={(index) => <ConversationItemMemo index={index} owner={owner} other={other} />}
                alignToBottom={true}
                followOutput="smooth"
                atBottomStateChange={setIsAtBottom}
                initialTopMostItemIndex={scrollPosition}
                rangeChanged={(range) => {
                  setScrollPosition(range.startIndex);
                }}
              />
            )}
          </div>

          <div
            css={css`
              position: relative;
              height: 0px;
            `}
          >
            <div
              css={css`
                position: absolute;
                right: ${(props) => props.theme.textSpacingHorizontal};
                bottom: ${(props) => props.theme.textSpacingVertical};
                transition: 0.5s;
                transition-delay: 0.5s;
                opacity: ${isAtBottom ? 0 : 1};
              `}
            >
              <Button
                icon="ScrollToBottom"
                label="Scroll to end"
                enabled={!isAtBottom}
                onClick={scrollToBottom}
                showLabel={false}
              />
            </div>
          </div>
          {/* <MessageEditor onSend={onSend} submitOnEnter={true} /> */}
        </div>
      }
      controls={null}
    />
  );
}

let conversationScrollPositions = Map.empty<{ owner: AccountId; other: AccountId }, number>();

function useConversationScrollPosition(owner: AccountId, other: AccountId) {
  const rangeRef = React.useRef(0);
  React.useEffect(() => {
    return () => {
      conversationScrollPositions = conversationScrollPositions.set({ owner, other }, rangeRef.current);
    };
  }, [other, owner]);
  const scrollPosition = React.useMemo(() => conversationScrollPositions.get({ owner, other }) ?? 0, [other, owner]);
  const setScrollPosition = React.useCallback((index: number) => {
    rangeRef.current = index;
  }, []);
  return [scrollPosition, setScrollPosition] as const;
}

type ConversationItemProps = {
  index: number;
  owner: AccountId;
  other: AccountId;
};
function ConversationItem({ index, owner, other }: ConversationItemProps) {
  const id = queries.ConversationAtIndex({ owner, other, index });
  if (!id) throw new Error();
  const { sender, recipient, createdAt } = id;
  const message = queries.DirectMessageById({ sender, recipient, createdAt });
  const senderAccount = queries.AccountById({ id: sender });
  const senderContact = queries.ContactById({ owner, id: sender });
  const senderName = senderAccount?.name ?? senderContact?.name ?? "???";
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto auto auto;
        padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
      `}
    >
      <div
        css={css`
          grid-row: 1;
          grid-column: 1;
          font-weight: ${(props) => props.theme.fontWeightBold};
        `}
      >
        <TruncatedLine text={senderName} />
      </div>
      <div
        css={css`
          grid-row: 1;
          grid-column: 2;
          display: flex;
          align-items: flex-end;
          color: ${(props) => props.theme.secondaryTextColor};
          font-size: ${(props) => props.theme.fontSizeSmall};
          text-align: right;
        `}
      >
        {dateTimeFormatter.format(createdAt.toDate())}
      </div>
      <div
        css={css`
          grid-row: 2;
          grid-column: 1 / span 2;
          white-space: pre-line;
          word-break: break-word;
        `}
      >
        {message.text}
      </div>
      {message && message.attachments.length > 0 && (
        <div
          css={css`
            grid-column: 1 / span 2;
            grid-row: 3;
          `}
        >
          {message.attachments.map(({ name }, index) => {
            return (
              <div
                key={index}
                css={css`
                  display: flex;
                `}
              >
                <div
                  css={css`
                    color: ${(props) => props.theme.secondaryTextColor};
                    margin-right: ${(props) => props.theme.gap};
                  `}
                >
                  <Icon icon="Attachment" />
                </div>
                <div
                  css={css`
                    flex-grow: 1;
                  `}
                >
                  <TruncatedLine text={name} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
const ConversationItemMemo = React.memo(ConversationItem);

const dateTimeFormatter = Intl.DateTimeFormat([], { dateStyle: "short", timeStyle: "medium" });
