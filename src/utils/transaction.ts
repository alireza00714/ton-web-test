import { tonWeb } from "../hooks/useTonWeb";

export interface TransactionMessage {
  address: string;
  amount: string;
  payload?: string;
}

export interface Transaction {
  validUntil: number;
  messages: TransactionMessage[];
}

export const createTransaction = (
  recipient: string,
  amount: string
): Transaction => {
  const amountInNano = tonWeb.utils.toNano(amount).toString();
  const payload = new TextEncoder().encode("");

  return {
    validUntil: Math.floor(Date.now() / 1000) + 600,
    messages: [
      {
        address: recipient,
        amount: amountInNano,
        payload: tonWeb.utils.bytesToBase64(payload),
      },
    ],
  };
};
