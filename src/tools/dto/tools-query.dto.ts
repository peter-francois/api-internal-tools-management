import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ToolsOwnerDepartment, ToolsStatus } from "../entities/tool.entity.js";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

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
  @ApiProperty({
    required: false,
    enum: ToolsOwnerDepartment,
    example: ToolsOwnerDepartment.Engineering,
  })
  @IsOptional()
  @IsEnum(ToolsOwnerDepartment)
  department?: ToolsOwnerDepartment;

  @ApiProperty({ required: false, enum: ToolsStatus, example: ToolsStatus.ACTIVE })
  @IsOptional()
  @IsEnum(ToolsStatus)
  status?: ToolsStatus;

  @ApiProperty({ required: false, example: 10, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min_cost?: number;

  @ApiProperty({ required: false, example: 50, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  max_cost?: number;

  @ApiProperty({ required: false, example: "Development" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false, example: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiProperty({ required: false, example: 10, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiProperty({ required: false, enum: ToolsSortBy, example: ToolsSortBy.NAME })
  @IsOptional()
  @IsEnum(ToolsSortBy)
  sortBy?: ToolsSortBy;

  @ApiProperty({ required: false, enum: SortOrder, example: SortOrder.ASC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
