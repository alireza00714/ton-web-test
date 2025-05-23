import { FC } from "react";
import { Button, Card, Input, Text, Spinner } from "@telegram-apps/telegram-ui";

interface TransactionFormUIProps {
  userAddress: string | undefined;
  recipient: string;
  amount: string;
  isLoading: boolean;
  error: string | null;
  transactionId: string | null;
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

            {transactionId && (
              <div>
                <Text>Transaction ID:</Text>
                <Text style={{ wordBreak: "break-all" }}>{transactionId}</Text>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};