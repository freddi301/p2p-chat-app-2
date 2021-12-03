import React from "react";
import { Virtuoso } from "react-virtuoso";
import { AccountId } from "../../domain/common/AccountId";
import { Button } from "../components/base/Button";
import { Clickable } from "../components/base/Clickable";
import { ControlButtonGroup } from "../components/reusable/ControlButtonGroup";
import { HeaderContentControlsLayout } from "../components/reusable/HeaderContentControlsLayout";
import { SimpleHeader } from "../components/reusable/SimpleHeader";
import { RoutingContext } from "../components/routing/useRoutingWithAnimation";
import { queries } from "../FrontendFacade";
import { AccountItem } from "../components/AccountItem";
import { css } from "styled-components/macro";

export function AccountListScreen() {
  const { push } = React.useContext(RoutingContext);
  const onAccount = (id: AccountId) => {
    push({ screen: "account", id });
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
          <CreateAccountHint />
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
          <Button icon="Create" label="Create" onClick={onCreate} showLabel={false} />
        </ControlButtonGroup>
      }
    />
  );
}

type AccountListItemProps = { index: number; onAccount(id: AccountId): void };
function AccountListItem({ index, onAccount }: AccountListItemProps) {
  const id = queries.AccountListAtIndex({ index });
  if (!id) throw new Error();
  return (
    <Clickable onClick={() => onAccount(id)}>
      <AccountItem id={id} />
    </Clickable>
  );
}

function CreateAccountHint() {
  const { push } = React.useContext(RoutingContext);
  const onCreate = () => {
    push({ screen: "account-create" });
  };
  return (
    <div
      css={css`
        display: grid;
        grid-row-gap: ${(props) => props.theme.gap};
        grid-auto-flow: row;
        grid-auto-rows: auto;
        padding: ${(props) => props.theme.textSpacingVertical} ${(props) => props.theme.textSpacingHorizontal};
      `}
    >
      <div>You don't have any accounts on this device</div>
      <div
        css={css`
          display: grid;
          grid-auto-flow: column;
          grid-column-gap: ${(props) => props.theme.gap};
        `}
      >
        <Button label="Create account" icon="Create" onClick={onCreate} enabled={true} showLabel={true} />
      </div>
    </div>
  );
}
