import React from "react";
import { css } from "styled-components/macro";
import { AccountId } from "../../domain/common/AccountId";
import { Timestamp } from "../../domain/common/Timestamp";
import { Button } from "../components/base/Button";
import { Input } from "../components/base/Input";
import { Textarea } from "../components/base/Textarea";
import { ContactQRcode } from "../components/reusable/ContactQRCode";
import { ControlButtonGroup } from "../components/reusable/ControlButtonGroup";
import { HeaderContentControlsLayout } from "../components/reusable/HeaderContentControlsLayout";
import { SimpleHeader } from "../components/reusable/SimpleHeader";
import { RoutingContext } from "../components/routing/useRoutingWithAnimation";
import { commands, queries } from "../FrontendFacade";

type AccountScreenProps = {
  id: AccountId;
};
export function AccountScreen({ id }: AccountScreenProps) {
  const { pop, push } = React.useContext(RoutingContext);
  const account = queries.AccountById({ id });
  if (!account) throw new Error();
  const [name, setName] = React.useState(account.name);
  const [description, setDescription] = React.useState(account.description);
  const onSave = () => {
    const timestamp = Timestamp.now();
    commands.AccountUpdate({ id, timestamp, name, description, secret: account.secret });
  };
  const onDelete = () => {
    const confirm = prompt("Type account name to confirm elimination");
    if (confirm === name) {
      const timestamp = Timestamp.now();
      commands.AccountDelete({ id, timestamp });
      pop();
    }
  };
  const onConversations = () => {
    push({ screen: "conversation-list", owner: id });
  };
  const onPosts = () => {
    push({ screen: "post-list", viewer: id, author: id });
  };
  const onPostsFeed = () => {
    push({ screen: "post-feed-list", owner: id });
  };
  const onContacts = () => {
    push({ screen: "contact-list", owner: id });
  };
  return (
    <HeaderContentControlsLayout
      header={<SimpleHeader>Account</SimpleHeader>}
      content={
        <div
          css={css`
            display: grid;
            grid-auto-flow: row;
            grid-auto-columns: auto;
            padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
            row-gap: ${(props) => props.theme.gap};
          `}
        >
          <Input label="Name" value={name} onChange={setName} />
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr auto;
              grid-column-gap: ${(props) => props.theme.gap};
            `}
          >
            <Textarea label="Public Key" value={id.toHex()} />
            <ContactQRcode text={id.toHex()} />
          </div>
          <Textarea label="Description" value={description} onChange={setDescription} />
          <Button label="Feed" icon="Posts" onClick={onPostsFeed} />
          <Button label="My Posts" icon="Posts" onClick={onPosts} />
          <Button label="Contacts" icon="Contacts" onClick={onContacts} />
          <Button label="Conversations" icon="Conversations" onClick={onConversations} />
        </div>
      }
      controls={
        <ControlButtonGroup>
          <Button label="Delete" icon="Delete" onClick={onDelete} showLabel={false} />
          <Button label="Save" icon="Save" onClick={onSave} showLabel={false} />
        </ControlButtonGroup>
      }
    />
  );
}
