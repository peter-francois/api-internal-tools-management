import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ToolsOwnerDepartment, ToolsStatus } from "../entities/tool.entity.js";
import { Type } from "class-transformer";

export enum ToolsSortBy {
  NAME = "name",
  MONTHLY_COST = "monthly_cost",
  CREATED_AT = "created_at",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export class ToolsQueryDto {
  @IsOptional()
  @IsEnum(ToolsOwnerDepartment)
  department?: ToolsOwnerDepartment;

  @IsOptional()
  @IsEnum(ToolsStatus)
  status?: ToolsStatus;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min_cost?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  max_cost?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsEnum(ToolsSortBy)
  sortBy?: ToolsSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
