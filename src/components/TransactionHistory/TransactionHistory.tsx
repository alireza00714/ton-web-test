import { TransactionHistoryListItem } from "@/types/transaction";
import { Card, Spinner, Text } from "@telegram-apps/telegram-ui";
import { useTonAddress } from "@tonconnect/ui-react";
import { FC, useEffect, useState } from "react";
import { useTonWeb } from "../../hooks/useTonWeb";

interface TransactionListItem {
  hash: string;
  from: string;
  to: string;
  amount: string;
  timestamp: number;
}

export const TransactionHistory: FC = () => {
  const userAddress = useTonAddress();
  const { tonWeb } = useTonWeb();
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userAddress) return;

      setIsLoading(true);
      try {
        const response: TransactionHistoryListItem[] =
          await tonWeb.getTransactions(userAddress);
        console.log({ response });
        const formattedTransactions = response.map((tx) => ({
          hash: tx.data,
          from: tx.in_msg.source,
          to: tx.in_msg.destination,
          amount: tonWeb.utils.fromNano(
            tx.in_msg.value === "0" ? tx.out_msgs[0].value : tx.in_msg.value
          ),
          timestamp: tx.utime,
        }));
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [userAddress]);

  if (!userAddress) return null;

  return (
    <Card>
      <div style={{ padding: "16px" }}>
        <Text style={{ marginBottom: "16px" }}>Transaction History</Text>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spinner size="m" />
          </div>
        ) : transactions.length === 0 ? (
          <Text>No transactions found</Text>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {transactions.map((tx) => (
              <div
                key={tx.hash}
                style={{
                  borderBottom: "1px solid #eee",
                  paddingBottom: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  width: "100%",
                }}
              >
                <Text style={{ fontSize: "12px", color: "#666" }}>
                  {new Date(tx.timestamp * 1000).toLocaleString()}
                </Text>
                <Text>Amount: {tx.amount} TON</Text>
                {tx.from && (
                  <Text style={{ fontSize: "12px" }}>
                    From: {tx.from.slice(0, 8)}...{tx.from.slice(-8)}
                  </Text>
                )}
                <Text style={{ fontSize: "12px" }}>
                  To: {tx.to.slice(0, 8)}...{tx.to.slice(-8)}
                </Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
