export interface TransactionHistoryListItem {
  "@type": string;
  address: Address;
  utime: number;
  data: string;
  transaction_id: TransactionId;
  fee: string;
  storage_fee: string;
  other_fee: string;
  in_msg: InMsg;
  out_msgs: OutMsg[];
}

export interface OutMsg {
  "@type": string;
  hash: string;
  source: string;
  destination: string;
  value: string;
  extra_currencies: any[];
  fwd_fee: string;
  ihr_fee: string;
  created_lt: string;
  body_hash: string;
  msg_data: MsgData2;
  message: string;
}

export interface MsgData2 {
  "@type": string;
  body: string;
  init_state: string;
}

export interface Address {
  "@type": string;
  account_address: string;
}

export interface TransactionId {
  "@type": string;
  lt: string;
  hash: string;
}

export interface InMsg {
  "@type": string;
  hash: string;
  source: string;
  destination: string;
  value: string;
  extra_currencies: any[];
  fwd_fee: string;
  ihr_fee: string;
  created_lt: string;
  body_hash: string;
  msg_data: MsgData;
  message: string;
}

export interface MsgData {
  "@type": string;
  text: string;
}
