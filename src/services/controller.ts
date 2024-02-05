import { Request, Response } from "express";
import { ApiError, ApiResponse } from "../utils/apiResponse";
import { InternalCode } from "../utils/internalCodes";
import { TakeHomeServices } from "./service";
import { AccountEvent } from "../entities/accountEvent";

export class TakeHomeController {
  constructor(private takeHomeServices: TakeHomeServices) { };

  async resetDatabase(req: Request, res: Response) {
    try {
      await this.takeHomeServices.reset();
      res.status(200).json(
        new ApiResponse(200)
      ).send();

    } catch (error: any) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(error).send();
      }
      else {
        res.status(500).json(
          new ApiError(500, InternalCode.INTERNAL_ERROR, error)
        ).send();
      }
    }
  }

  async getBalance(req: Request, res: Response) {
    try {
      const accountId = req.query.account_id as string;
      const balance = await this.takeHomeServices.getBalance(accountId);
      res.status(200).json(
        new ApiResponse(200, balance)
      ).send();

    } catch (error: any) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(error).send();
      }
      else {
        res.status(500).json(
          new ApiError(500, InternalCode.INTERNAL_ERROR, error)
        ).send();
      }
    }
  }

  async createAccountEvent(req: Request, res: Response) {
    try {
      const newAccountEvent = new AccountEvent(req.body);
      console.log(newAccountEvent);
      let responseBody: any;

      if (newAccountEvent.type === "deposit") {
        console.log('deposito');
        await this.takeHomeServices.depositBalance(newAccountEvent);
        responseBody = {
          destination: {
            id: newAccountEvent.destinationAccount,
            balance: await this.takeHomeServices.getBalance(newAccountEvent.destinationAccount!)
          }
        }
        console.log(responseBody);
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
        await this.takeHomeServices.transferBalance(newAccountEvent);
        responseBody = {
          origin: {
            id: newAccountEvent.originAccount,
            balance: await this.takeHomeServices.getBalance(newAccountEvent.originAccount!)
          },
          destination: {
            id: newAccountEvent.destinationAccount,
            balance: await this.takeHomeServices.getBalance(newAccountEvent.destinationAccount!)
          }
        }
      }
      res.status(201).json(
        new ApiResponse(201, responseBody)
      ).send();

    } catch (error: any) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(error).send();
      }
      else {
        res.status(500).json(
          new ApiError(500, InternalCode.INTERNAL_ERROR, error)
        ).send();
      }
    }
  }
}