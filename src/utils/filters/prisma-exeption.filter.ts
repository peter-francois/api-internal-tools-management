import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import { ErrorResponseInterface } from "../response.interface.js";
import { PrismaErrorEnum } from "../prisma-error.enum.js";


interface PrismaErrorInterface {
  prismaCode: string;
  timestamp: string;
  path: string;
  requestBody?: Record<string, unknown>;
  message: string;
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExeptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const toolId = request.params["id"] || "unknown";
    let statusCode: number = HttpStatus.BAD_REQUEST;
    const baseDetails: PrismaErrorInterface = {
      prismaCode: exception.code,
      timestamp: new Date().toISOString(),
      path: request.url,
      requestBody: request.body as Record<string, unknown>,
      message: "Unexepted prisma error",
    };

    const responseBody: ErrorResponseInterface<PrismaErrorInterface> = {
      error: "Database error",
      details: baseDetails,
    };

    switch (exception.code as PrismaErrorEnum) {
      case PrismaErrorEnum.UniqueConstraintFailed:
        statusCode = HttpStatus.CONFLICT;
        responseBody.details.message = "Unique constraint failed";
        break;

      case PrismaErrorEnum.ForeignKeyConstraintFailed:
        statusCode = HttpStatus.CONFLICT;
        responseBody.details.message = "Foreign key constraint failed";
        break;

      case PrismaErrorEnum.ToolNotFound:
        statusCode = HttpStatus.NOT_FOUND;
        responseBody.details.message = `Tool with ID ${toolId} does not exist`;
        break;

      default:
        break;
    }

    response.status(statusCode).json(responseBody);
  }
}
