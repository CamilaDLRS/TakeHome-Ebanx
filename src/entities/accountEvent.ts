import *  as uuid from 'uuid';

export type EventTypes = 'deposit' | 'withdraw' | 'transfer';

export class AccountEvent {
  id: string;
  type: EventTypes;
  originAccount: string | null;
  amount: number;
  destinationAccount: string | null;

  constructor(data: any) {
    this.id = data.id || uuid.v4();
    this.type = data.type;
    this.originAccount = data.origin || null;
    this.amount = data.amount;
    this.destinationAccount = data.destination || null;
  }
}