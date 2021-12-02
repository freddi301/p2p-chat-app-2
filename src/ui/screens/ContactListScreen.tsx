import React from "react";
import { Virtuoso } from "react-virtuoso";
import { AccountId } from "../../domain/common/AccountId";
import { Button } from "../components/base/Button";
import { Clickable } from "../components/base/Clickable";
import { ContactItem } from "../components/ContactItem";
import { ControlButtonGroup } from "../components/reusable/ControlButtonGroup";
import { EmptyListPlaceholder } from "../components/reusable/EmptyListPlaceholder";
import { HeaderContentControlsLayout } from "../components/reusable/HeaderContentControlsLayout";
import { SimpleHeader } from "../components/reusable/SimpleHeader";
import { RoutingContext } from "../components/routing/useRoutingWithAnimation";
import { queries } from "../FrontendFacade";

type ContactListScreenProps = {
  owner: AccountId;
};
export function ContactListScreen({ owner }: ContactListScreenProps) {
  const { push } = React.useContext(RoutingContext);
  const onContact = (id: AccountId) => {
    push({ screen: "contact", owner, id });
  };
  const onCreate = () => {
    push({ screen: "contact-create", owner });
  };
  const contactListSize = queries.ContactListSize({ owner });
  return (
    <HeaderContentControlsLayout
      header={<SimpleHeader>Contacts</SimpleHeader>}
      content={
        contactListSize === 0 ? (
          <EmptyListPlaceholder>No contacts</EmptyListPlaceholder>
        ) : (
          <Virtuoso
            style={{ height: "100%" }}
            totalCount={contactListSize}
            itemContent={(index) => <ContactListItem index={index} owner={owner} onContact={onContact} />}
          />
        )
      }
      controls={
        <ControlButtonGroup>
          <Button icon="Create" label="Create" onClick={onCreate} />
        </ControlButtonGroup>
      }
    />
  );
}

type ContactListItemProps = { index: number; owner: AccountId; onContact(id: AccountId): void };
function ContactListItem({ index, onContact, owner }: ContactListItemProps) {
  const id = queries.ContactListAtIndex({ owner, index });
  if (!id) throw new Error();
  return (
    <Clickable onClick={() => onContact(id)}>
      <ContactItem owner={owner} id={id} />
    </Clickable>
  );
}
