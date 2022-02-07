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

type ContactScreenProps = {
  owner: AccountId;
  id: AccountId;
};
export function ContactScreen({ owner, id }: ContactScreenProps) {
  const { push, pop } = React.useContext(RoutingContext);
  const contact = queries.ContactById({ owner, id });
  if (!contact) throw new Error();
  const [name, setName] = React.useState(contact.name);
  const [description, setDescription] = React.useState("");
  const onSave = () => {
    const timestamp = Timestamp.now();
    commands.ContactUpdate({ owner, id, timestamp, name, description });
  };
  const onDelete = () => {
    const confirm = prompt("Type contact name to confirm elimination");
    if (confirm === name) {
      const timestamp = Timestamp.now();
      commands.ContactDelete({ owner, id, timestamp });
      pop();
    }
  };
  const onConversation = () => {
    push({ screen: "conversation", owner, other: id });
  };
  return (
    <HeaderContentControlsLayout
      header={<SimpleHeader>Contact</SimpleHeader>}
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
            <Textarea label="AccountId" value={id.toHex()} />
            <ContactQRcode text={id.toHex()} />
          </div>
          <Textarea label="Description" value={description} onChange={setDescription} />
          <Button label="Conversation" icon="Conversation" onClick={onConversation} />
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
