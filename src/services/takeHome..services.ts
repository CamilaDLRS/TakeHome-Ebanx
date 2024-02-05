import { FakeDatabase } from "../database/db";
import { Account } from "../entities/account";
import { AccountEvent } from "../entities/accountEvent";
import { ApiError } from "../utils/apiResponse";
import { InternalCode } from "../utils/internalCodes";

export class TakeHomeServices {

  constructor(private repositories: FakeDatabase) { }

  async reset(): Promise<void> {
    try {
      this.repositories.resetDatabase();
    } catch (error) {
      console.log("Could not reset the fake database.", error);
      throw error;
    }
  }

  async getBalance(accountId: string): Promise<number | null> {
    try {
      const balance = await this.repositories.getBalanceAccount(accountId);

      if (balance === null) {
        throw new ApiError(404, InternalCode.NOT_FOUND);
      }
      return balance;
    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not get account balance.", error);
      }
      throw error;
    }
  }

  async depositBalance(event: AccountEvent): Promise<void> {
    try {
      const existingBalance = await this.getBalance(event.destinationAccount!);

      if (existingBalance === null) {
        throw new ApiError(404, InternalCode.NOT_FOUND);
      }

      const account = new Account(existingBalance + event.amount, event.destinationAccount!);
      await this.repositories.updateBalanceAccount(account);
      await this.repositories.createAccountEvent(event);

    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not create an authentication user.", error);
      }
      throw error;
    }
  }

  async withdrawBalance(event: AccountEvent) {
    try {
      const currentBalance = await this.getBalance(event.originAccount!);
      if (currentBalance === null) {
        throw new ApiError(404, InternalCode.NOT_FOUND);
      }
      else {
        const account = new Account(currentBalance - event.amount, event.originAccount!);
        await this.repositories.updateBalanceAccount(account);
        await this.repositories.createAccountEvent(event);
      }
    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not create an authentication user.", error);
      }
      throw error;
    }
  }

  async transferBalance(event: AccountEvent) {
    try {
      const originBalance = await this.getBalance(event.originAccount!);
      const destinationBalance = await this.getBalance(event.destinationAccount!);

      if (originBalance === null || destinationBalance === null) {
        throw new ApiError(404, InternalCode.NOT_FOUND);
      }
      else {
        const originAccount = new Account(originBalance - event.amount, event.originAccount!);
        const destinationAccount = new Account(destinationBalance + event.amount, event.destinationAccount!);

        await this.repositories.updateBalanceAccount(originAccount);
        await this.repositories.updateBalanceAccount(destinationAccount);
        await this.repositories.createAccountEvent(event);
      }
    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not create an authentication user.", error);
      }
      throw error;
    }
  }
}