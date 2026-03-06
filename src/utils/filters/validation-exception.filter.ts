import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from "@nestjs/common";
import { Response } from "express";
import { ErrorResponseInterface } from "../response.interface.js";

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as { message: string[] };

    const responseBody: ErrorResponseInterface<string[]> = {
      error: "Validation failed",
      details: exceptionResponse.message,
    };

    response.status(status).json(responseBody);
  }
}
