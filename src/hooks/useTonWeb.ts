import TonWeb from "tonweb";

export const tonWeb = new TonWeb(
  new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC")
);

export const useTonWeb = () => {
  const isValidAddress = (address: string): boolean => {
    try {
      tonWeb.utils.Address.isValid(address);
      return true;
    } catch {
      return false;
    }
  };

  const isValidAmount = (value: string): boolean => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue > 0;
  };

  const toNano = (amount: string): string => {
    return tonWeb.utils.toNano(amount).toString();
  };

  return {
    isValidAddress,
    isValidAmount,
    toNano,
    tonWeb,
  };
};
