import React from "react";
import { Virtuoso } from "react-virtuoso";
import { css } from "styled-components/macro";
import { AccountId } from "../../domain/common/AccountId";
import { Button } from "../components/base/Button";
import { Clickable } from "../components/base/Clickable";
import { Icon } from "../components/base/Icon";
import { ControlButtonGroup } from "../components/reusable/ControlButtonGroup";
import { EmptyListPlaceholder } from "../components/reusable/EmptyListPlaceholder";
import { HeaderContentControlsLayout } from "../components/reusable/HeaderContentControlsLayout";
import { SimpleHeader } from "../components/reusable/SimpleHeader";
import { TruncatedLine } from "../components/reusable/TruncatedLine";
import { RoutingContext } from "../components/routing/useRoutingWithAnimation";
import { queries } from "../FrontendFacade";

type ConversationListScreenProps = {
  owner: AccountId;
};
export function ConversationListScreen({ owner }: ConversationListScreenProps) {
  const { push } = React.useContext(RoutingContext);
  const onConversation = (other: AccountId) => {
    push({ screen: "conversation", owner, other });
  };
  const onCreate = () => {
    push({ screen: "conversation-create", owner });
  };
  const conversationListSize = queries.ConversationListSize({ owner });
  return (
    <HeaderContentControlsLayout
      header={<SimpleHeader>Conversation</SimpleHeader>}
      content={
        !conversationListSize ? (
          <EmptyListPlaceholder>No conversations</EmptyListPlaceholder>
        ) : (
          <Virtuoso
            style={{ height: "100%" }}
            totalCount={conversationListSize}
            itemContent={(index) => (
              <ConversationLisItemMemo index={index} owner={owner} onConversation={onConversation} />
            )}
          />
        )
      }
      controls={
        <ControlButtonGroup>
          <Button label="Create" icon="Create" onClick={onCreate} showLabel={false} />
        </ControlButtonGroup>
      }
    />
  );
}

type ConversationItemProps = {
  index: number;
  owner: AccountId;
  onConversation(other: AccountId): void;
};
function ConversationLisItem({ index, onConversation, owner }: ConversationItemProps) {
  const conversation = queries.ConversationListAtIndex({ owner, index });
  if (!conversation) throw new Error();
  const contact = queries.ContactById({ owner, id: conversation.other });
  return (
    <Clickable onClick={() => onConversation(conversation.other)}>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto auto;
          padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
        `}
      >
        <div
          css={css`
            grid-column: 1;
            grid-row: 1;
            font-weight: ${(props) => props.theme.fontWeightBold};
          `}
        >
          <TruncatedLine text={contact?.name ?? "???"} />
        </div>
        <div
          css={css`
            grid-column: 2;
            grid-row: 1;
            color: ${(props) => props.theme.secondaryTextColor};
            font-size: ${(props) => props.theme.fontSizeSmall};
          `}
        >
          {dateTimeFormatter.format(conversation.lastMessage.createdAt.toDate())}
        </div>
        <div
          css={css`
            grid-column: 1 / span 2;
            grid-row: 2;
            display: flex;
          `}
        >
          <div
            css={css`
              flex-grow: 1;
            `}
          >
            <TruncatedLine text={conversation.lastMessage.text} />
          </div>
          {conversation && conversation.lastMessage.attachments.length > 0 && (
            <div
              css={css`
                color: ${(props) => props.theme.secondaryTextColor};
                margin-left: ${(props) => props.theme.gap};
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <Icon icon="Attachment" />
              <div
                css={css`
                  margin-left: ${(props) => props.theme.gap};
                `}
              >
                {conversation.lastMessage.attachments.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </Clickable>
  );
}
const ConversationLisItemMemo = React.memo(ConversationLisItem);

const dateTimeFormatter = Intl.DateTimeFormat([], { dateStyle: "short", timeStyle: "medium" });
