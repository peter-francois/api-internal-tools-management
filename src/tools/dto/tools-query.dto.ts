import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { tools_owner_department, tools_status } from "../../generated/prisma/enums.js";

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
    enum: tools_owner_department,
    example: tools_owner_department.Engineering,
  })
  @IsOptional()
  @IsEnum(tools_owner_department)
  department?: tools_owner_department;

  @ApiProperty({
    example: tools_status.active,
    required: false,
    enum: tools_status,
  })
  @IsOptional()
  @IsEnum(tools_status)
  status?: tools_status;

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
