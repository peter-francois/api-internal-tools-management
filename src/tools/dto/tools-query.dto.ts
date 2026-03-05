import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ToolsOwnerDepartment, ToolsStatus } from "../entities/tool.entity.js";

export class ToolsQueryDto {
  @IsOptional()
  @IsEnum(ToolsOwnerDepartment)
  department?: ToolsOwnerDepartment;

  @IsOptional()
  @IsEnum(ToolsStatus)
  status?: ToolsStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_cost?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  max_cost?: number;

  @IsOptional()
  @IsString()
  category?: string;
}
