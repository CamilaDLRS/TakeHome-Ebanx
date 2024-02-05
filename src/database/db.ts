import sqlite3 from 'sqlite3';
import { AccountEvent } from '../entities/accountEvent';
import { Account } from '../entities/account';

export class FakeDatabase {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(':memory:');
    this.initializeDatabase();
  }

  private initializeDatabase() {
    console.log('Initializing database...');
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        balance REAL
      )
    `);

    this.db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      type TEXT,
      originAccount TEXT,
      amount REAL,
      destinationAccount TEXT,
      FOREIGN KEY (originAccount) REFERENCES accounts (id),
      FOREIGN KEY (destinationAccount) REFERENCES accounts (id)
    )
  `);

    // Insert some fake data
    this.db.exec(`
      INSERT INTO accounts (id, balance) VALUES
        ('100', 0),
        ('300', 0)
    `);


  }

  public resetDatabase() {
    this.db.exec(`
      DROP TABLE IF EXISTS accounts;
      DROP TABLE IF EXISTS events;
    `);

    this.initializeDatabase();
  }

  public createAccountEvent(data: AccountEvent): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO events (id, type, originAccount, amount, destinationAccount) VALUES (?, ?, ?, ?, ?)',
        [data.id, data.type, data.originAccount, data.amount, data.destinationAccount],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }

  public getBalanceAccount(id: string): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT balance FROM accounts WHERE id = ?',
        [id],
        (err, row: { balance: number }) => {
          if (err) {
            reject(err);
          } else {
            resolve(row ? row.balance : null);
          }
        });
    });
  }

  public updateBalanceAccount(data: Account): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE accounts SET balance = ? WHERE id = ?',
        [data.balance, data.id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }
}