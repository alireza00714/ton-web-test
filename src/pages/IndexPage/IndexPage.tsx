import { FC } from "react";
import { Page } from "@/components/Page.tsx";
import { TransactionForm } from "@/components/TransactionForm";
import { WalletBalance } from "@/components/WalletBalance/WalletBalance";
import { TransactionHistory } from "@/components/TransactionHistory/TransactionHistory";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Text } from "@telegram-apps/telegram-ui";

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <TonConnectButton />
        </div>

        <Text style={{ textAlign: "center", marginBottom: "16px" }}>
          TON Transaction Demo
        </Text>

        <WalletBalance />
        <TransactionForm />
        <TransactionHistory />
      </div>
    </Page>
  );
};
