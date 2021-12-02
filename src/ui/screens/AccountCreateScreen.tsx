import React from "react";
import { css } from "styled-components/macro";
import { AccountSecret } from "../../domain/common/AccountSecret";
import { Timestamp } from "../../domain/common/Timestamp";
import { Button } from "../components/base/Button";
import { Input } from "../components/base/Input";
import { Textarea } from "../components/base/Textarea";
import { ControlButtonGroup } from "../components/reusable/ControlButtonGroup";
import { HeaderContentControlsLayout } from "../components/reusable/HeaderContentControlsLayout";
import { SimpleHeader } from "../components/reusable/SimpleHeader";
import { RoutingContext } from "../components/routing/useRoutingWithAnimation";
import { commands } from "../FrontendFacade";

type AccountCreateScreenProps = {};

export function AccountCreateScreen(props: AccountCreateScreenProps) {
  const { pop } = React.useContext(RoutingContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const canCreate = name.trim().length > 0;
  const onCreate = () => {
    const [id, secret] = AccountSecret.create();
    const timestamp = Timestamp.now();
    commands.AccountCreate({ id, secret, timestamp, name, description });
    pop();
  };
  return (
    <HeaderContentControlsLayout
      header={<SimpleHeader>Create Account</SimpleHeader>}
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
          <Input label="Name" value={name} onChange={setName} required={true} />
          <Textarea label="Notes" value={description} onChange={setDescription} />
        </div>
      }
      controls={
        <ControlButtonGroup>
          <Button label="Create" icon="Save" onClick={onCreate} enabled={canCreate} showLabel={false} />
        </ControlButtonGroup>
      }
    />
  );
}
