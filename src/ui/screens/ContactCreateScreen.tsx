import React from "react";
import QrReader from "react-qr-reader";
import { css, useTheme } from "styled-components/macro";
import { AccountId } from "../../domain/common/AccountId";
import { Timestamp } from "../../domain/common/Timestamp";
import { Button } from "../components/base/Button";
import { Input } from "../components/base/Input";
import { Textarea } from "../components/base/Textarea";
import { ControlButtonGroup } from "../components/reusable/ControlButtonGroup";
import { HeaderContentControlsLayout } from "../components/reusable/HeaderContentControlsLayout";
import { SimpleHeader } from "../components/reusable/SimpleHeader";
import { RoutingContext } from "../components/routing/useRoutingWithAnimation";
import { commands } from "../FrontendFacade";

type ContactCreateScreenProps = { owner: AccountId };
export function ContactCreateScreen({ owner }: ContactCreateScreenProps) {
  const { pop } = React.useContext(RoutingContext);
  const [accountId, setAccountId] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [showQrReader, setShowQrReader] = React.useState(Boolean);
  const onCreate = () => {
    const id = AccountId.fromHex(accountId);
    const timestamp = Timestamp.now();
    commands.ContactUpdate({ id, owner, name, timestamp, description });
    pop();
  };
  const canCreate = name.trim().length > 0 && !!tryElse(() => AccountId.fromHex(accountId), false);
  const theme = useTheme();
  return (
    <HeaderContentControlsLayout
      header={<SimpleHeader>Create contact</SimpleHeader>}
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
          <Textarea label="Description" value={description} onChange={setDescription} />
          <Textarea label="Account id" value={accountId} onChange={setAccountId} required={true} />
          <Button label="Scan" icon="QRCode" onClick={() => setShowQrReader(!showQrReader)} />
          {showQrReader && (
            <QrReader
              style={{ borderRadius: theme.rowBorderRadius, overflow: "hidden" }}
              onScan={(data) => {
                if (data) {
                  const publicKey = tryElse(() => AccountId.fromHex(data), null);
                  if (publicKey) {
                    setAccountId(publicKey.toHex());
                    setShowQrReader(false);
                  }
                }
              }}
              onError={() => {
                setShowQrReader(false);
              }}
            />
          )}
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

function tryElse<R, O>(fun: () => R, otherwise: O) {
  try {
    return fun();
  } catch (error) {
    return otherwise;
  }
}
