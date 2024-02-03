import { ApiError } from "../utils/apiResponse";
import { InternalCode } from "../utils/internalCodes";

export class TakeHomeServices {

  constructor() { }

  async reset() {
    try {
      throw new ApiError(404, InternalCode.NOT_IMPLEMENTED);
    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not create an authentication user.", error);
      }
      throw error;
    }
  }

  async getBalance() {
    try {
      throw new ApiError(404, InternalCode.NOT_IMPLEMENTED);
    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not create an authentication user.", error);
      }
      throw error;
    }
  }

  async depositBalance() {
    try {
      throw new ApiError(404, InternalCode.NOT_IMPLEMENTED);
    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not create an authentication user.", error);
      }
      throw error;
    }
  }

  async withdrawBalance() {
    try {
      throw new ApiError(404, InternalCode.NOT_IMPLEMENTED);
    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not create an authentication user.", error);
      }
      throw error;
    }
  }

  async transferBalance() {
    try {
      throw new ApiError(404, InternalCode.NOT_IMPLEMENTED);
    } catch (error) {
      if (!(error instanceof ApiError)) {
        console.log("Could not create an authentication user.", error);
      }
      throw error;
    }
  }
}