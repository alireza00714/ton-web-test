import { FC } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import { Card, Spinner, Text } from "@telegram-apps/telegram-ui";
import { useTonWeb } from "../../hooks/useTonWeb";
import { useEffect, useState } from "react";

export const WalletBalance: FC = () => {
  const userAddress = useTonAddress();
  const { tonWeb } = useTonWeb();
  const [balance, setBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (userAddress) {
        try {
          const balanceInNano = await tonWeb.getBalance(userAddress);
          const balanceInTon = tonWeb.utils.fromNano(balanceInNano);
          setBalance(balanceInTon);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 10000);

    return () => clearInterval(interval);
  }, [userAddress]);

  return (
    <Card>
      <div style={{ padding: "16px", display: "flex", gap: "16px" }}>
        <Text>Wallet Balance</Text>
        {isLoading ? (
          <Spinner size="s" />
        ) : (
          <Text style={{ fontSize: "24px", fontWeight: "bold" }}>
            {balance} TON
          </Text>
        )}
      </div>
    </Card>
  );
};
