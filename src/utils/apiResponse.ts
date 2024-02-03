import { ErrorMessage, InternalCode } from "./internalCodes";

export class ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data?: T;

  constructor(statusCode: number, data?: T) {
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class ApiError<T> extends ApiResponse<T> {
  error: {
    internalCode: InternalCode;
    message: string;
    data?: any;
  };

  constructor(statusCode: number, internalCode: InternalCode, message?: string | null, data?: any) {

    super(statusCode);
    this.success = false;

    this.error = {
      internalCode,
      message: message || ErrorMessage[internalCode]
    }
    this.error.data = data;
  }
}
