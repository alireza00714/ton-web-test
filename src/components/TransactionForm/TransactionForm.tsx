import { FC, useState } from "react";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { useTonWeb } from "../../hooks/useTonWeb";
import { createTransaction } from "../../utils/transaction";
import { TransactionFormUI } from "./TransactionFormUI";

interface TransactionFormProps {
  onSuccess?: (transactionHash: string) => void;
  onError?: (error: Error) => void;
}

export const TransactionForm: FC<TransactionFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  const { isValidAddress, isValidAmount } = useTonWeb();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSendTransaction = async () => {
    if (!isValidAddress(recipient)) {
      setError("Invalid recipient address");
      onError?.(new Error("Invalid recipient address"));
      return;
    }

    if (!isValidAmount(amount)) {
      setError("Invalid amount");
      onError?.(new Error("Invalid amount"));
      return;
    }

    setIsLoading(true);
    setError(null);
    setTransactionId(null);

    try {
      const transaction = createTransaction(recipient, amount);
      const result = await tonConnectUI.sendTransaction(transaction);
      const transactionId = result.boc;

      setTransactionId(transactionId);
      onSuccess?.(transactionId);
    } catch (e) {
      const error = e instanceof Error ? e : new Error("Unknown error occurred");
      setError(error.message);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TransactionFormUI
      userAddress={userAddress}
      recipient={recipient}
      amount={amount}
      isLoading={isLoading}
      error={error}
      transactionId={transactionId}
      onRecipientChange={setRecipient}
      onAmountChange={setAmount}
      onSendTransaction={handleSendTransaction}
    />
  );
};
