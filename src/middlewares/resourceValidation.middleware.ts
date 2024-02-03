import { Request, Response } from "express";
import { ObjectSchema } from "yup";
import { ApiError } from "../utils/apiResponse";
import { InternalCode } from "../utils/internalCodes";

export class ResourceValidation {
  
  static validateRequest(resourceSchema: ObjectSchema<any>) {
    return async (req: Request, res: Response, next: () => void) => {
      try {
        // throws an error if not valid
        await resourceSchema.validate(
        { 
          query: req.query, 
          body: req.body,
          params: req.params
        });
        
        next();
      } catch (e: any) {
        res.status(400).json(new ApiError(400, InternalCode.INVALID_REQUEST, e.errors.join(", ")));
      }
    };
  }
}