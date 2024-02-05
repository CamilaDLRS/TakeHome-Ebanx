import *  as uuid from 'uuid';

export class Account {
  id: string;
  balance: number;

  constructor(balance: number, id?: string) {
    this.id = id || uuid.v4();
    this.balance = balance;
  }
}