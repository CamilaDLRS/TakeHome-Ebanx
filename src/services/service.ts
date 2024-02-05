import { FakeDatabase } from "../database/db";
import { Account } from "../entities/account";
import { AccountEvent } from "../entities/accountEvent";
import { ApiError } from "../utils/apiResponse";
import { InternalCode } from "../utils/internalCodes";

export class TakeHomeServices {

  constructor(private repositories: FakeDatabase) { }

  async reset(): Promise<void> {
    try {
      await this.repositories.resetDatabase();
    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not reset the fake database.", error);
      }
      throw error;
    }
  }

  async getBalance(accountId: string): Promise<number | null> {
    try {
      const balance = await this.repositories.getBalanceAccount(accountId);
      console.log('balance = ', balance);
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
      if (await this.getBalance(event.destinationAccount!) !== null) {
        await this.repositories.updateBalanceAccount(event.amount, event.destinationAccount!);
        await this.repositories.createAccountEvent(event);
      }
      else {
        throw new ApiError(404, InternalCode.INVALID_REQUEST);
      }
      return;
    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not create an authentication user.", error);
      }
      throw error;
    }
  }

  async withdrawBalance(event: AccountEvent) {
    try {
      if (await this.getBalance(event.originAccount!) !== null) {
        //editar saldo, subtraÇão
        await this.repositories.updateBalanceAccount(-event.amount, event.originAccount!);
        await this.repositories.createAccountEvent(event);
      }
      else {
        throw new ApiError(404, InternalCode.INVALID_REQUEST);
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
      if ((await this.getBalance(event.originAccount!) != null) &&
        (await this.getBalance(event.destinationAccount!) != null)) {
        await this.repositories.updateBalanceAccount(-event.amount, event.originAccount!);
        await this.repositories.updateBalanceAccount(event.amount, event.destinationAccount!);
        await this.repositories.createAccountEvent(event);
      }
      else {
        throw new ApiError(404, InternalCode.INVALID_REQUEST);
      }
    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not create an authentication user.", error);
      }
      throw error;
    }
  }
}