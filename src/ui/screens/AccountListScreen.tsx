import React from "react";
import { Virtuoso } from "react-virtuoso";
import { AccountId } from "../../domain/common/AccountId";
import { Button } from "../components/base/Button";
import { Clickable } from "../components/base/Clickable";
import { ControlButtonGroup } from "../components/reusable/ControlButtonGroup";
import { EmptyListPlaceholder } from "../components/reusable/EmptyListPlaceholder";
import { HeaderContentControlsLayout } from "../components/reusable/HeaderContentControlsLayout";
import { SimpleHeader } from "../components/reusable/SimpleHeader";
import { RoutingContext } from "../components/routing/useRoutingWithAnimation";
import { queries } from "../FrontendFacade";
import { AccountItem } from "../components/AccountItem";

export function AccountListScreen() {
  const { push } = React.useContext(RoutingContext);
  const onAccount = (accountId: AccountId) => {
    push({ screen: "account", accountId });
  };
  const onCreate = () => {
    push({ screen: "account-create" });
  };
  const accountListSize = queries.AccountListSize();
  return (
    <HeaderContentControlsLayout
      header={<SimpleHeader>Accounts</SimpleHeader>}
      content={
        accountListSize === 0 ? (
          <EmptyListPlaceholder>No accounts</EmptyListPlaceholder>
        ) : (
          <Virtuoso
            style={{ height: "100%" }}
            totalCount={accountListSize}
            itemContent={(index) => <AccountListItem index={index} onAccount={onAccount} />}
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

type AccountListItemProps = { index: number; onAccount(accountId: AccountId): void };
function AccountListItem({ index, onAccount }: AccountListItemProps) {
  const id = queries.AccountListAtIndex({ index });
  if (!id) throw new Error();
  return (
    <Clickable onClick={() => onAccount(id)}>
      <AccountItem id={id} />
    </Clickable>
  );
}
