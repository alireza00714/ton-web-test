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
  const { isValidAddress, isValidAmount, tonWeb } = useTonWeb();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingForTxHash, setIsWaitingForTxHash] = useState(false);
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
      const previousTx = (await tonWeb.getTransactions(userAddress, 1))[0];
      const previousTxHash = previousTx?.transaction_id?.hash;

      const transaction = createTransaction(recipient, amount);
      await tonConnectUI.sendTransaction(transaction);

      setIsWaitingForTxHash(true);

      let currentTxHash = previousTxHash;
      let newTx;

      while (currentTxHash === previousTxHash) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        newTx = (await tonWeb.getTransactions(userAddress, 1))[0];
        currentTxHash = newTx?.transaction_id?.hash;
      }

      setTransactionId(currentTxHash);
      onSuccess?.(currentTxHash);
    } catch (e) {
      const error =
        e instanceof Error ? e : new Error("Unknown error occurred");
      setError(error.message);
      onError?.(error);
    } finally {
      setIsWaitingForTxHash(false);
      setIsLoading(false);
    }
  };

  return (
    <TransactionFormUI
      userAddress={userAddress}
      recipient={recipient}
      amount={amount}
      isLoading={isLoading}
      isWaitingForTxHash={isWaitingForTxHash}
      error={error}
      transactionId={transactionId}
      onRecipientChange={setRecipient}
      onAmountChange={setAmount}
      onSendTransaction={handleSendTransaction}
    />
  );
};
