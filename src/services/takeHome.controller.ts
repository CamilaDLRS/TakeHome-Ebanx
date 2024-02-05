import { Request, Response } from "express";
import { ApiError } from "../utils/apiResponse";
import { InternalCode } from "../utils/internalCodes";
import { TakeHomeServices } from "./takeHome..services";
import { AccountEvent } from "../entities/accountEvent";

export class TakeHomeController {
  constructor(private takeHomeServices: TakeHomeServices) { };

  private handleInternalError(res: Response, error: any): void {
    res.status(500).json(new ApiError(500, InternalCode.INTERNAL_ERROR, error)).send();
  }
  
  async resetDatabase(req: Request, res: Response) {
    try {
      await this.takeHomeServices.reset();
      res.status(200).send('OK');

    } catch (error: any) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(error).send();
      }
      else {
        this.handleInternalError(res, error);
      }
    }
  }

  async getBalance(req: Request, res: Response) {
    try {
      const accountId = req.query.account_id as string;
      const balance = await this.takeHomeServices.getBalance(accountId);
      
      res.status(200).json(balance).send();

    } catch (error: any) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(0).send();
      }
      else {
        this.handleInternalError(res, error);
      }
    }
  }

  async createAccountEvent(req: Request, res: Response) {
    try {
      const newAccountEvent = new AccountEvent(req.body);
      let responseBody: any;

      if (newAccountEvent.type === "deposit") {
        await this.takeHomeServices.depositBalance(newAccountEvent);
        responseBody = {
          destination: {
            id: newAccountEvent.destinationAccount,
            balance: await this.takeHomeServices.getBalance(newAccountEvent.destinationAccount!)
          }
        }
      }
      else if (newAccountEvent.type === "withdraw") {
        await this.takeHomeServices.withdrawBalance(newAccountEvent);
        responseBody = {
          origin: {
            id: newAccountEvent.originAccount,
            balance: await this.takeHomeServices.getBalance(newAccountEvent.originAccount!)
          }
        }
      }
      else if (newAccountEvent.type === "transfer") {
        const [originBalance, destinationBalance] = await Promise.all([
          this.takeHomeServices.getBalance(newAccountEvent.originAccount!),
          this.takeHomeServices.getBalance(newAccountEvent.destinationAccount!)
        ]);
        await this.takeHomeServices.transferBalance(newAccountEvent);

        responseBody = {
          origin: {
            id: newAccountEvent.originAccount,
            balance: originBalance
          },
          destination: {
            id: newAccountEvent.destinationAccount,
            balance: destinationBalance 
          }
        }
      }
      
      res.status(201).json(responseBody).send();

    } catch (error: any) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(0).send();
      }
      else {
        this.handleInternalError(res, error);
      }
    }
  }
}