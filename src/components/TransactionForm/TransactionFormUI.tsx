import { FC } from "react";
import { Button, Card, Input, Text, Spinner } from "@telegram-apps/telegram-ui";

interface TransactionFormUIProps {
  userAddress: string | undefined;
  recipient: string;
  amount: string;
  isLoading: boolean;
  error: string | null;
  transactionId: string | null;
  isWaitingForTxHash: boolean;
  onRecipientChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onSendTransaction: () => void;
}

export const TransactionFormUI: FC<TransactionFormUIProps> = ({
  userAddress,
  recipient,
  amount,
  isLoading,
  error,
  transactionId,
  onRecipientChange,
  onAmountChange,
  onSendTransaction,
  isWaitingForTxHash,
}) => {
  return (
    <Card>
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Text>Send TON Transaction</Text>

        {!userAddress ? (
          <Text color="danger">
            Please connect your wallet to send transactions
          </Text>
        ) : (
          <>
            <Input
              value={recipient}
              onChange={(e) => onRecipientChange(e.target.value)}
              placeholder="Enter TON address"
              disabled={isLoading}
            />

            <Input
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="Amount (TON)"
              type="number"
              min="0"
              step="0.01"
              disabled={isLoading}
            />

            <Button
              onClick={onSendTransaction}
              disabled={isLoading || !recipient || !amount}
              stretched
            >
              {isLoading ? <Spinner size="s" /> : "Send Transaction"}
            </Button>

            {error && <Text color="danger">{error}</Text>}

            {isWaitingForTxHash && (
              <div style={{ display: "flex", gap: "8px" }}>
                <Spinner size="s" />
                <Text>Waiting for transaction confirmation...</Text>
              </div>
            )}

            {transactionId && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text>Transaction Hash:</Text>
                <Text style={{ wordBreak: "break-all" }}>{transactionId}</Text>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};
