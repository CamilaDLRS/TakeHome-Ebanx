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
        throw new ApiError(404, InternalCode.INVALID_REQUEST);
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
      if (await this.getBalance(event.destinationAccount!) === null) {
        throw new ApiError(404, InternalCode.INVALID_REQUEST);
      }
      else {
        const account = new Account(event.amount, event.destinationAccount!);
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

  async withdrawBalance(event: AccountEvent) {
    try {
      const currentlyBalance = await this.getBalance(event.originAccount!);
      if (currentlyBalance === null) {
        throw new ApiError(404, InternalCode.INVALID_REQUEST);
      }
      else {
        const account = new Account(currentlyBalance - event.amount, event.destinationAccount!);
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
      const currentlyOriginBalance = await this.getBalance(event.originAccount!);
      const currentlyDestinationBalance = await this.getBalance(event.destinationAccount!);

      if (currentlyOriginBalance === null || currentlyDestinationBalance=== null) {
        throw new ApiError(404, InternalCode.INVALID_REQUEST);
      }
      else {
        const originAccount = new Account(currentlyOriginBalance - event.amount, event.originAccount!);
        const account = new Account(currentlyDestinationBalance + event.amount, event.destinationAccount!);

        await this.repositories.updateBalanceAccount(originAccount);
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
}