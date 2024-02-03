import { Request, Response } from "express";
import { ApiError, ApiResponse } from "../utils/apiResponse";
import { InternalCode } from "../utils/internalCodes";
import { TakeHomeServices } from "./service";

export class TakeHomeController {
  constructor(private takeHomeServices: TakeHomeServices) { };

  async resetDatabase(req: Request, res: Response) {
    try {
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

  async createEvent(req: Request, res: Response) {
    try {
      res.status(201).json(
        new ApiResponse(201)
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